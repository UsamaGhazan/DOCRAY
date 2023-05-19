import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import doctors from './data/doctors.js';

config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
