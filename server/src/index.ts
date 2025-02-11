import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { bookingRouter } from './routes/booking.js';
import { adminRouter } from './routes/admin.js';
import { docsRouter } from './routes/docs.js';
import { environment } from './config/environment.js';
import { securityMiddleware } from './middleware/security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Production middleware
if (environment.isProduction) {
  app.set('trust proxy', 1);
  securityMiddleware.forEach(middleware => app.use(middleware));
}

// CORS configuration
app.use(cors({
  origin: environment.corsOrigins,
  credentials: true
}));

app.use(express.json());

// Only serve docs in development
if (!environment.isProduction) {
  app.use('/explorer', express.static(join(__dirname, '../../explorer')));
  app.use('/docs', docsRouter);
}

// API routes
app.use('/api/admin', adminRouter);
app.use('/api/booking', bookingRouter);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: environment.isProduction ? 'Internal server error' : err.message
  });
});

app.listen(environment.port, () => {
  console.log(`
🚀 Server running in ${environment.nodeEnv} mode on port ${environment.port}
${!environment.isProduction ? `
📚 API Documentation:
   - Explorer UI: http://localhost:${environment.port}/explorer
   - Swagger JSON: http://localhost:${environment.port}/docs/swagger.json` : ''}
  `);
});
