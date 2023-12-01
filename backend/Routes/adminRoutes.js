import express from 'express';
const router = express.Router();
// import {
//   authUser,
//   getPatientProfile,
//   registerUser,
//   bookAppointment,
//   getUpcommingAppointments,
// } from '../Controllers/patientController.js';
import { protect } from '../Middlewares/authMiddleware.js';

export default router;
