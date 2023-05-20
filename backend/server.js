import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import doctorRoutes from './Routes/doctorRoutes.js';
import { notFound, errorHandler } from './Middlewares/errorMiddleware.js';

config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Api is running...');
});
app.use('/api/doctors', doctorRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
