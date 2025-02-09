-- Create audit log function
CREATE OR REPLACE FUNCTION log_booking_changes()
RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'Booking operation: %, Data: %', TG_OP, NEW;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to log all booking operations
CREATE TRIGGER booking_audit_log
    BEFORE INSERT OR UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION log_booking_changes();
