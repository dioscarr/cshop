UPDATE barbers 
SET image_url = CASE 
    WHEN name = 'James Wilson' THEN 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg'
    WHEN name = 'Michael Chen' THEN 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg'
    WHEN name = 'David Rodriguez' THEN 'https://images.pexels.com/photos/2076930/pexels-photo-2076930.jpeg'
    ELSE image_url
END
WHERE name IN ('James Wilson', 'Michael Chen', 'David Rodriguez');
