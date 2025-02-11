import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import { environment } from '../config/environment.js';

export const securityMiddleware = [
  helmet(),
  compression(),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: environment.apiRateLimit,
    message: 'Too many requests from this IP, please try again later.'
  })
];
