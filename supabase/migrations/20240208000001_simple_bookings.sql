-- Create a simpler bookings table for direct appointments
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Allow public access to create bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Bookings are viewable by anyone" ON bookings FOR SELECT USING (true);
