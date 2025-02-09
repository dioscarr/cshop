-- First, drop existing tables if they exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS barber_availability;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS barbers;

-- Create tables
CREATE TABLE barbers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    expertise TEXT[],
    image_url TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR NOT NULL,
    client_email VARCHAR NOT NULL,
    client_phone VARCHAR,
    barber_id UUID REFERENCES barbers(id),
    service_id UUID REFERENCES services(id),
    booking_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insert initial data
INSERT INTO barbers (name, description, expertise, image_url, rating, reviews) 
VALUES 
    ('James Wilson', 'Master Barber with 15+ years of experience specializing in classic cuts and hot towel shaves.', 
    ARRAY['Classic Cuts', 'Razor Fades', 'Hot Towel Shaves'], 
    'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg', 4.9, 127),
    ('Michael Chen', 'Contemporary stylist known for modern techniques and precision fades.',
    ARRAY['Modern Styles', 'Design Cuts', 'Textured Crops'],
    'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg', 4.8, 98),
    ('David Rodriguez', 'Beard specialist and styling expert with a passion for traditional barbering.',
    ARRAY['Beard Styling', 'Scissor Work', 'Traditional Cuts'],
    'https://images.pexels.com/photos/2076930/pexels-photo-2076930.jpeg', 4.9, 156);

INSERT INTO services (name, description, price, duration)
VALUES
    ('Classic Haircut', 'Complete haircut service including consultation, shampoo, precision cut, and styling.', 30.00, 45),
    ('Beard Trim & Shape', 'Expert beard grooming including trim, shape, and line-up.', 25.00, 30),
    ('Royal Shave', 'Luxurious hot towel straight razor shave with premium products.', 35.00, 45),
    ('Hair & Beard Combo', 'Our most popular package combines our classic haircut with a full beard trim and style.', 50.00, 75);

-- Enable RLS but allow public access
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Barbers are viewable by everyone" ON barbers FOR SELECT USING (true);
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Anyone can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Bookings are viewable by creator's email" ON bookings FOR SELECT 
USING (client_email = current_user);
