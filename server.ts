import express from 'express';
import * as barberController from './api/barbers/barbers';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './api/swagger.json';

const app = express();
app.use(express.json());

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Serve Swagger JSON
app.get('/docs/swagger.json', (_req, res) => {
  res.sendFile(__dirname + '/api/swagger.json');
});

// Public barber routes
app.get('/api/booking/barbers', async (_req, res) => {
  const barbers = await barberController.listBarbers();
  res.json(barbers);
});

// Admin barber routes
app.get('/api/admin/barbers', async (_req, res) => {
  const barbers = await barberController.listBarbers();
  res.json(barbers);
});

app.post('/api/admin/barbers', async (req, res) => {
  const barber = await barberController.createBarber(req.body);
  res.json(barber);
});

app.get('/api/admin/barbers/:id', async (req, res) => {
  const barber = await barberController.getBarber(req.params.id);
  if (barber) {
    res.json(barber);
  } else {
    res.status(404).json({ message: 'Barber not found' });
  }
});

app.put('/api/admin/barbers/:id', async (req, res) => {
  const barber = await barberController.updateBarber(req.params.id, req.body);
  if (barber) {
    res.json(barber);
  } else {
    res.status(404).json({ message: 'Barber not found' });
  }
});

app.delete('/api/admin/barbers/:id', async (req, res) => {
  await barberController.deleteBarber(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/docs`);
});
