import express from 'express';
import cors from 'cors';
import { bookingRouter } from './routes/booking.js';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/booking', bookingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Test the API: http://localhost:${port}/api/health`);
});
