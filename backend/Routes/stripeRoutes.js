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
    console.log('formatted Date ', formattedDate);
    //using findOne to get a single appointment object
    const appointment = await Appointment.findOne({
      doctorId: doctorId,
      patientId: _id,
    });

    const doctor = await Doctor.findById(doctorId);
    console.log('doctor.availableTimeSlots before', doctor.availableTimeSlots);

    if (doctor) {
      //Removing the appointed slot from doctor's available slots
      //Assigninng new array value to doctor.availableTimeSlots
      doctor.availableTimeSlots = doctor.availableTimeSlots.filter((slot) => {
        return slot.startTime.toISOString() !== formattedDate;
      });
      console.log('doctor.availableTimeSlots after', doctor.availableTimeSlots);
      await doctor.save();
    } else {
      res.status(401);
      throw new Error('Doctor not found');
    }
    if (appointment) {
      appointment.feePayed = true;
      await appointment.save();
    } else {
      res.status(404);
      throw new Error('No Appointment');
    }
    const idempontencyKey = uuidv4();
    return stripeAPI.customers
      .create({
        email: token.email,
        source: token.source,
      })
      .then((customer) => {
        return stripeAPI.paymentIntents.create(
          {
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
          },
          {
            idempotencyKey: idempontencyKey,
          }
        );
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: 'An error occurred during payment processing.' });
      });
  })
);

export default router;
