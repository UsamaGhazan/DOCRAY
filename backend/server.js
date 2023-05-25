import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import doctorRoutes from './Routes/doctorRoutes.js';
import patientRoutes from './Routes/patientRoutes.js';
import stripe from 'stripe';
import Patient from './Models/patientModel.js';
import { v4 as uuidv4 } from 'uuid';
import { protect } from './Middlewares/authMiddleware.js';
import {
  notFound,
  errorHandler,
} from './Middlewares/errorHandlerMiddleware.js';
import { RestartProcess } from 'concurrently';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});

// Stripe API implementation
const stripeAPI = stripe(process.env.STRIPE_SECRET_KEY);

app.post('/payment', protect, async (req, res) => {
  const { doctor, token } = req.body;
  console.log('doctor ', doctor, 'token ', token);
  //For keeping record of user so user is not charged twice
  const idempontencyKey = uuidv4();

  try {
    const patient = await stripeAPI.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripeAPI.charges.create(
      {
        amount: doctor.charges * 100,
        currency: 'usd',
        customer: patient.id,
        description: patient.name,
      },
      { idempontencyKey }
    );

    const patientToUpdate = await Patient.findOne({ email: token.email });

    // Update the feePaid value to true
    if (patientToUpdate) {
      patientToUpdate.feePaid = true;
      await patientToUpdate.save();
    }

    res.status(200).json(charge);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
