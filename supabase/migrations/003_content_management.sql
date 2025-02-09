-- Create content management tables
CREATE TABLE IF NOT EXISTS site_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR NOT NULL UNIQUE,
    title VARCHAR,
    content TEXT,
    type VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Content is viewable by everyone" ON site_content
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can update content" ON site_content
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert initial content
INSERT INTO site_content (key, title, content, type) VALUES
-- Homepage content
('home_hero_title', 'Expert Barbers at Your Service', 'Experience the finest in grooming and style', 'text'),
('home_hero_subtitle', 'Book Your Perfect Cut', 'Professional haircuts and grooming services tailored to you', 'text'),

-- About section
('about_section', 'About Our Barbershop', 'We are dedicated to providing exceptional grooming services in a welcoming environment. Our skilled barbers bring years of experience and passion to every cut.', 'text'),

-- Services intro
('services_intro', 'Our Premium Services', 'Choose from our range of professional grooming services', 'text'),

-- Booking steps
('booking_step_1', 'Choose Your Barber', 'Select from our experienced team of professional barbers', 'step'),
('booking_step_2', 'Select Service', 'Pick the service that best fits your needs', 'step'),
('booking_step_3', 'Pick Date & Time', 'Choose a convenient appointment time', 'step'),
('booking_step_4', 'Confirm Booking', 'Review and confirm your appointment details', 'step'),

-- Footer content
('footer_address', 'Location', '123 Styling Street, Beauty City, ST 12345', 'contact'),
('footer_hours', 'Business Hours', 'Monday-Saturday: 9:00 AM - 5:00 PM\nSunday: Closed', 'contact'),
('footer_phone', 'Contact', '+1 (555) 123-4567', 'contact');

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update the updated_at column
CREATE TRIGGER update_site_content_updated_at
    BEFORE UPDATE ON site_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
