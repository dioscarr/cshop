import { Request, Response, NextFunction } from 'express';
import supabase from '../lib/supabase-client.js';

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  console.log('Checking admin token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Admin token required' });
  }

  try {
    const { data, error } = await supabase
      .from('admin_codes')
      .select('*')
      .eq('id', token)
      .eq('is_active', true)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      console.log('Invalid admin token:', error?.message);
      return res.status(401).json({ error: 'Invalid admin token' });
    }

    req.adminData = data;
    next();
  } catch (err) {
    console.error('Admin auth error:', err);
    res.status(500).json({ error: 'Failed to verify admin token' });
  }
};
