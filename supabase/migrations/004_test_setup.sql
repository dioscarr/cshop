-- Create tables first
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

-- Now add the policies
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do everything on barbers"
ON barbers FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do everything on services"
ON services FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do everything on appointments"
ON appointments FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Add some test data
INSERT INTO barbers (name, description, expertise, image_url, rating, reviews)
SELECT 'Test Barber', 'Test Description', ARRAY['Test Cut'], 'test.jpg', 5.0, 1
WHERE NOT EXISTS (SELECT 1 FROM barbers WHERE name = 'Test Barber');

-- Update test data with better details
INSERT INTO barbers (name, description, expertise, image_url, rating, reviews)
SELECT 
  'Alex Thompson', 
  'Master stylist with over 8 years of experience in modern and classic cuts. Specialized in precision fading and textured styles.', 
  ARRAY['Modern Cuts', 'Fades', 'Styling'], 
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
  4.9, 
  42
WHERE NOT EXISTS (SELECT 1 FROM barbers WHERE name = 'Alex Thompson');

INSERT INTO services (name, description, price, duration)
SELECT 'Test Service', 'Test Description', 30.00, 30
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Test Service');
