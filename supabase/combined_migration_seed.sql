-- First run the schema
BEGIN;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS barbers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    expertise TEXT[],
    image_url TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    barber_id UUID REFERENCES barbers(id),
    service_id UUID REFERENCES services(id),
    appointment_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'pending',
    payment_status VARCHAR NOT NULL DEFAULT 'unpaid',
    payment_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS barber_availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    barber_id UUID REFERENCES barbers(id),
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    UNIQUE(barber_id, day_of_week)
);

-- Enable RLS
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_availability ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Barbers are viewable by everyone" ON barbers
    FOR SELECT USING (true);

CREATE POLICY "Services are viewable by everyone" ON services
    FOR SELECT USING (true);

CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" ON appointments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Barber availability viewable by everyone" ON barber_availability
    FOR SELECT USING (true);

-- Now insert the seed data
-- Seed barbers
INSERT INTO barbers (name, description, expertise, image_url, rating, reviews) VALUES
('James Wilson', 'Master Barber with 15+ years of experience specializing in classic cuts and hot towel shaves.', ARRAY['Classic Cuts', 'Razor Fades', 'Hot Towel Shaves'], 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg', 4.9, 127),
('Michael Chen', 'Contemporary stylist known for modern techniques and precision fades.', ARRAY['Modern Styles', 'Design Cuts', 'Textured Crops'], 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg', 4.8, 98),
('David Rodriguez', 'Beard specialist and styling expert with a passion for traditional barbering.', ARRAY['Beard Styling', 'Scissor Work', 'Traditional Cuts'], 'https://images.pexels.com/photos/2076930/pexels-photo-2076930.jpeg', 4.9, 156);

-- Seed services
INSERT INTO services (name, description, price, duration) VALUES
('Classic Haircut', 'Complete haircut service including consultation, shampoo, precision cut, and styling.', 30.00, 45),
('Beard Trim & Shape', 'Expert beard grooming including trim, shape, and line-up.', 25.00, 30),
('Royal Shave', 'Luxurious hot towel straight razor shave with premium products.', 35.00, 45),
('Hair & Beard Combo', 'Our most popular package combines our classic haircut with a full beard trim and style.', 50.00, 75);

-- Seed barber availability
INSERT INTO barber_availability (barber_id, day_of_week, start_time, end_time) 
SELECT 
  b.id,
  generate_series(0, 6) as day_of_week,
  '09:00'::time as start_time,
  '17:00'::time as end_time
FROM barbers b;

COMMIT;
