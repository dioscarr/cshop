-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR NOT NULL,
    client_email VARCHAR NOT NULL,
    client_phone VARCHAR,
    barber_id UUID NOT NULL,
    service_id UUID NOT NULL,
    booking_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insert test data
INSERT INTO bookings (
    client_name,
    client_email,
    client_phone,
    barber_id,
    service_id,
    booking_datetime,
    status,
    notes
) VALUES (
    'Test User',
    'test@example.com',
    '123-456-7890',
    (SELECT id FROM barbers LIMIT 1),
    (SELECT id FROM services LIMIT 1),
    NOW() + interval '1 day',
    'pending',
    'Test booking'
);

-- Enable RLS but allow all operations for now
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access to bookings" ON bookings FOR ALL USING (true);
