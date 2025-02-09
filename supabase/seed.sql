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

-- Seed barber availability (example for James Wilson)
INSERT INTO barber_availability (barber_id, day_of_week, start_time, end_time) 
SELECT 
  b.id,
  generate_series(0, 6) as day_of_week,
  '09:00'::time as start_time,
  '17:00'::time as end_time
FROM barbers b
WHERE b.name = 'James Wilson';
