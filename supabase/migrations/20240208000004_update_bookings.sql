-- Create staff_members table first
CREATE TABLE IF NOT EXISTS staff_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'staff',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insert a test staff member
INSERT INTO staff_members (email, name, role)
VALUES ('staff@example.com', 'Staff Member', 'staff');

-- Drop existing bookings table if it exists
DROP TABLE IF EXISTS bookings;

-- Create bookings table with proper references
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR NOT NULL,
    client_email VARCHAR NOT NULL,
    client_phone VARCHAR,
    barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE RESTRICT,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    booking_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Add indexes for faster queries
CREATE INDEX idx_bookings_barber ON bookings(barber_id);
CREATE INDEX idx_bookings_service ON bookings(service_id);
CREATE INDEX idx_bookings_datetime ON bookings(booking_datetime);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Enable RLS but allow all operations for now
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create more specific policies
CREATE POLICY "Anyone can create bookings"
    ON bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Customers can view their own bookings"
    ON bookings FOR SELECT
    USING (client_email = current_user OR current_user IS NULL);

-- Modify the staff policy to use EXISTS
CREATE POLICY "Staff can view all bookings"
    ON bookings FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM staff_members 
        WHERE staff_members.email = current_user
    ));

-- Add trigger to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

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
