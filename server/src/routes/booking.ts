import { Router } from 'express';
import supabase from '../lib/supabase-client.js';

const router = Router();

router.get('/services', async (req, res) => {
  try {
    console.log('Fetching services...');
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log(`Found ${data?.length || 0} services`);
    res.json(data);
  } catch (err) {
    console.error('Services error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/barbers', async (req, res) => {
  try {
    console.log('Fetching barbers...');
    const { data, error } = await supabase
      .from('barbers')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log(`Found ${data?.length || 0} barbers`);
    res.json(data);
  } catch (err) {
    console.error('Barbers error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    console.log('Creating appointment...');
    const { data, error } = await supabase
      .from('appointments')
      .insert([req.body])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Appointment created:', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('Appointments error:', err);
    res.status(500).json({ error: err.message });
  }
});

export { router as bookingRouter };
