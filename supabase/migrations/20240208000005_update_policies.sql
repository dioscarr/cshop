-- Remove staff_members table and its references
DROP TABLE IF EXISTS staff_members;

-- Update the booking policies to use barbers table
DROP POLICY IF EXISTS "Staff can view all bookings" ON bookings;

-- Create new policy for barbers to view bookings
CREATE POLICY "Barbers can view all bookings"
    ON bookings FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM barbers 
        WHERE barbers.id = bookings.barber_id
    ));

-- Add policy for barbers to update booking status
CREATE POLICY "Barbers can update their bookings"
    ON bookings FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM barbers 
        WHERE barbers.id = bookings.barber_id
    ));

-- Keep the existing policies for customer views and creation
CREATE POLICY "Anyone can create bookings"
    ON bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Customers can view their own bookings"
    ON bookings FOR SELECT
    USING (client_email = current_user OR current_user IS NULL);
