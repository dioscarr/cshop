import { Router } from 'express';
import supabase from '../lib/supabase-client.js';

const router = Router();

// Simple ping test
router.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Test database connection
router.get('/db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('count')
      .single();

    if (error) throw error;

    res.json({
      status: 'ok',
      connection: 'successful',
      count: data?.count,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Test error handling
router.get('/error', (req, res) => {
  res.status(500).json({
    error: 'Test error response',
    timestamp: new Date().toISOString()
  });
});

export { router as testRouter };
