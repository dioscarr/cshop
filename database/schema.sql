-- Drop existing tables in correct order (respect foreign keys)
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS barbers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS admin_codes CASCADE;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR NOT NULL,
    image_url TEXT,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users,
    full_name VARCHAR,
    address TEXT,
    phone VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create barbers table (moved up)
CREATE TABLE barbers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    bio TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create services table (moved up)
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- duration in minutes
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create order_items table
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create cart table
CREATE TABLE cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(user_id, product_id)
);

-- Create appointments table (now after barbers and services)
CREATE TABLE appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    barber_id UUID REFERENCES barbers(id) NOT NULL,
    service_id UUID REFERENCES services(id) NOT NULL,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'pending',
    customer_name VARCHAR NOT NULL,
    customer_email VARCHAR NOT NULL,
    customer_phone VARCHAR,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create admin codes table
CREATE TABLE admin_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Insert default admin code (replace 'your-secure-code' with actual code)
INSERT INTO admin_codes (code, is_active, expires_at)
VALUES ('ADMIN123', true, TIMEZONE('utc'::text, NOW()) + INTERVAL '30 days');

-- Create RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_codes ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Cart items policies
CREATE POLICY "Users can manage their own cart" ON cart_items
    FOR ALL USING (auth.uid() = user_id);

-- Drop existing appointments policies first
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can create their own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can create appointments without auth" ON appointments;
DROP POLICY IF EXISTS "Users can view their appointments by email" ON appointments;

-- Create new simplified policies for appointments
CREATE POLICY "Allow public to create appointments"
    ON appointments FOR INSERT
    WITH CHECK (true);  -- Allow anyone to create appointments

CREATE POLICY "Allow public to view appointments"
    ON appointments FOR SELECT
    USING (true);  -- Allow anyone to view appointments for now

CREATE POLICY "Allow public to update appointments"
    ON appointments FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Add policy for admin codes
CREATE POLICY "Allow anonymous to verify admin codes" ON admin_codes
    FOR SELECT USING (is_active = true AND expires_at > NOW());

-- Make sure RLS is enabled
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Barbers and Services are publicly viewable
CREATE POLICY "Barbers are viewable by everyone" ON barbers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Services are viewable by everyone" ON services
    FOR SELECT USING (is_active = true);

-- Update the admin bookings query policy
CREATE POLICY "Allow public to view appointments with joins"
    ON appointments FOR SELECT
    USING (true);

-- Clear existing services
TRUNCATE TABLE services CASCADE;

-- Insert comprehensive service list
INSERT INTO services (id, name, description, duration, price, is_active)
VALUES 
  (uuid_generate_v4(), 'Classic Haircut', 'Traditional haircut with precision trimming and styling', 30, 35.00, true),
  (uuid_generate_v4(), 'Luxury Beard Trim', 'Premium beard grooming including hot towel and conditioning', 25, 25.00, true),
  (uuid_generate_v4(), 'Full Service Package', 'Complete haircut and beard grooming with premium products', 60, 55.00, true),
  (uuid_generate_v4(), 'Kids Haircut', 'Child-friendly haircut service (12 and under)', 20, 25.00, true),
  (uuid_generate_v4(), 'Senior Cut', 'Specialized service for our distinguished clients', 30, 30.00, true),
  (uuid_generate_v4(), 'Head Shave', 'Clean head shave with hot towel treatment', 35, 40.00, true),
  (uuid_generate_v4(), 'Hair & Scalp Treatment', 'Deep conditioning treatment with scalp massage', 45, 45.00, true),
  (uuid_generate_v4(), 'Express Cut', 'Quick trim and style for busy professionals', 15, 25.00, true),
  (uuid_generate_v4(), 'Fade & Design', 'Custom fade with optional design work', 45, 50.00, true),
  (uuid_generate_v4(), 'VIP Complete Service', 'Premium package including cut, beard, and hair treatment', 90, 85.00, true);

-- Insert sample barbers
INSERT INTO barbers (id, name, bio, is_active)
VALUES 
  (uuid_generate_v4(), 'John Doe', 'Master barber with 10 years experience', true),
  (uuid_generate_v4(), 'Jane Smith', 'Specialist in modern styles', true),
  (uuid_generate_v4(), 'Mike Johnson', 'Expert in classic cuts', true);
