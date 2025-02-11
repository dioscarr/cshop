import { Router } from 'express';
import supabase from '../lib/supabase-client.js';

const router = Router();

// Simple verification without database
router.post('/verify-code', (req, res) => {
  const { code } = req.body;
  console.log('Received code:', code); // Debug log

  // Basic static code check
  if (code === 'ADMIN123') {
    console.log('Access granted');
    return res.json({
      success: true,
      message: 'Access granted',
      token: 'admin-token'
    });
  }

  console.log('Access denied');
  return res.status(401).json({
    success: false,
    message: 'Invalid access code'
  });
});

// Get all bookings with service and barber details
router.get('/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        service:service_id (
          name,
          duration
        ),
        barber:barber_id (
          name
        )
      `)
      .order('appointment_date', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }

    const bookings = data.map(booking => ({
      id: booking.id,
      customer_name: booking.customer_name,
      customer_email: booking.customer_email,
      appointment_date: booking.appointment_date,
      status: booking.status,
      notes: booking.notes,
      service_name: booking.service?.name,
      service_duration: booking.service?.duration,
      barber_name: booking.barber?.name
    }));

    res.json(bookings);
  } catch (err) {
    console.error('Failed to fetch bookings:', err);
    res.status(500).json({
      error: 'Failed to fetch bookings',
      details: err.message
    });
  }
});

// Update booking status
router.post('/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: `Booking ${status}` });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to update booking status',
      details: err.message
    });
  }
});

// Reschedule booking
router.post('/bookings/:id/reschedule', async (req, res) => {
  const { id } = req.params;
  const { appointment_date } = req.body;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ 
        appointment_date,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    res.json({ 
      success: true, 
      message: 'Booking rescheduled'
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to reschedule booking',
      details: err.message
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Admin route is working' });
});

export { router as adminRouter };
