import { config } from 'dotenv';

config();

export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3000', 10),
  supabaseUrl: process.env.VITE_SUPABASE_URL,
  supabaseKey: process.env.VITE_SUPABASE_ANON_KEY,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '100', 10),
  adminCode: process.env.ADMIN_CODE || 'ADMIN123'
};
