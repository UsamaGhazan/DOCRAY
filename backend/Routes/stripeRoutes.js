import express from 'express';
import asyncHandler from 'express-async-handler';
import stripe from 'stripe';
import { protect } from '../Middlewares/authMiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import Appointment from '../Models/appointmentModel.js';
import Doctor from '../Models/doctorModel.js';
const router = express.Router();
//Change later to env(check kro 2 env files ki wja sy masla to ni araha)
const stripeAPI = new stripe(
  'sk_test_51NBUB0SH4AJANTU5jWfqmOGx7CITuyLxGWCtOwSxY9YO35iJLcaY0FOzMSgPhoBwpufWR6ztxCV1NrsnkM20QSGh00cswwpQa0'
);

router.post(
  '/pay',
  protect,
  asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { token, amount, doctorId, formattedDate } = req.body;

    try {
      // Fetch the appointment and doctor
      const appointment = await Appointment.findOne({
        doctorId: doctorId,
        patientId: _id,
      });
      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
        res.status(401);
        throw new Error('Doctor not found');
      }

      // Update doctor's available time slots
      doctor.availableTimeSlots = doctor.availableTimeSlots.filter(
        (slot) => slot.startTime.toISOString() !== formattedDate
      );
      await doctor.save();

      // Mark the appointment as paid
      if (appointment) {
        appointment.feePayed = true;
        await appointment.save();
      } else {
        res.status(404);
        throw new Error('No Appointment');
      }

      // Create a unique key for idempotency
      const idempotencyKey = uuidv4();

      // Create a customer in Stripe
      const customer = await stripeAPI.customers.create({
        email: token.email,
        source: token.source,
      });

      // Create a payment intent in Stripe
      const paymentIntent = await stripeAPI.paymentIntents.create(
        {
          amount: amount * 100, // Convert amount to cents
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
        },
        {
          idempotencyKey: idempotencyKey,
        }
      );

      // Store payment information in earningsHistory
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Resetting the time to 00:00:00

      const existingEarning = doctor.earningsHistory.find(
        (entry) => entry.date.getTime() === today.getTime()
      );

      if (existingEarning) {
        // If an entry for today already exists, update the earnings
        existingEarning.earning += amount;
      } else {
        // If no entry for today exists, create a new entry
        doctor.earningsHistory.push({
          date: today,
          earning: amount,
        });
      }

      await doctor.save();

      console.log(
        'Doctor earnings history after payment: ',
        doctor.earningsHistory
      );
      console.log(
        'Doctor total earnings: ',
        doctor.earningsHistory.reduce(
          (total, entry) => total + entry.earning,
          0
        )
      );

      // Send success response
      res.status(201).json({ message: 'Payment successful' });
    } catch (error) {
      console.error('Error during payment processing:', error.message);
      res
        .status(500)
        .json({ error: 'An error occurred during payment processing.' });
    }
  })
);

export default router;
