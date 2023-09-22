import express from 'express';
const router = express.Router();

import {
  getAllDoctors,
  getSingleDoctor,
  createDoctorReview,
  registerDoctor,
  authDoctor,
  profileViewCount,
  getAppointments,
  setAvailableSlots,
  getAvailableSlots,
  searchDoctor,
  cancelAppointment,
  appointmentDetails,
} from '../Controllers/doctorController.js';
import { protect } from '../Middlewares/authMiddleware.js';
router.get('/', getAllDoctors);
router.post('/login', authDoctor);
router.post('/', registerDoctor);
router.post('/profileViewCount', profileViewCount);
router.post('/setAvailableSlots', protect, setAvailableSlots);
router.get('/getAvailableSlots', protect, getAvailableSlots);
router.get('/searchDoctor', searchDoctor);
router.get('/getAppointmentDetail', appointmentDetails);
router.get('/getAppointments/:id', getAppointments);
router.post('/:id/reviews', protect, createDoctorReview);
router.delete('/cancelAppointment/:id', cancelAppointment);

router.get('/:id', getSingleDoctor);

export default router;
