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
