import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import doctorRoutes from './Routes/doctorRoutes.js';
import patientRoutes from './Routes/patientRoutes.js';
import stripeRoutes from './Routes/stripeRoutes.js';
import imageUpload from './Routes/imageUpload.js';
import path from 'path';
import {
  notFound,
  errorHandler,
} from './Middlewares/errorHandlerMiddleware.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/image', imageUpload);
app.use(notFound);
app.use(errorHandler);

//Making the upload folder static so we can access it from frontend
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //------------------------------

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
