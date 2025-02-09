-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Customers can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Bookings are viewable by creator's email" ON bookings;
DROP POLICY IF EXISTS "Staff can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Barbers can view all bookings" ON bookings;

-- Create simpler policies
CREATE POLICY "Enable insert for all users"
    ON bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable select for all users"
    ON bookings FOR SELECT
    USING (true);

CREATE POLICY "Enable update for all users"
    ON bookings FOR UPDATE
    USING (true);

-- Make sure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
