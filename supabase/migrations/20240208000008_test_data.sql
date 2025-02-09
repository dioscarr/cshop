-- First, ensure tables are empty
TRUNCATE TABLE bookings CASCADE;
TRUNCATE TABLE barbers CASCADE;
TRUNCATE TABLE services CASCADE;

-- Insert test barbers
INSERT INTO barbers (id, name, description, expertise, image_url, rating, reviews)
VALUES 
    ('1f46c6c8-1234-4f1e-8f0f-d0f120f3e789', 'James Wilson', 'Master Barber', ARRAY['Classic Cuts'], 'https://example.com/james.jpg', 4.9, 127),
    ('2a56c6c8-5678-4f1e-8f0f-d0f120f3e789', 'Michael Chen', 'Style Expert', ARRAY['Modern Cuts'], 'https://example.com/michael.jpg', 4.8, 98);

-- Insert test services
INSERT INTO services (id, name, description, price, duration)
VALUES 
    ('3b66c6c8-90ab-4f1e-8f0f-d0f120f3e789', 'Classic Haircut', 'Traditional cut', 30.00, 30),
    ('4c76c6c8-cdef-4f1e-8f0f-d0f120f3e789', 'Beard Trim', 'Precision trim', 25.00, 20);

-- Insert test booking
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
    'Test Client',
    'test@example.com',
    '123-456-7890',
    '1f46c6c8-1234-4f1e-8f0f-d0f120f3e789',
    '3b66c6c8-90ab-4f1e-8f0f-d0f120f3e789',
    NOW() + interval '1 day',
    'pending',
    'Test booking'
);
