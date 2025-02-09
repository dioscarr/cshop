-- Allow service role to do everything
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do everything on barbers"
ON barbers FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do everything on services"
ON services FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do everything on appointments"
ON appointments FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
