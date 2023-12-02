import express from 'express';
const router = express.Router();
import {
  authUser,
  getPatientProfile,
  registerUser,
  bookAppointment,
  getUpcommingAppointments,
  symptomChecker,
} from '../Controllers/patientController.js';
import { protect } from '../Middlewares/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getPatientProfile);
router.post('/bookAppointment', protect, bookAppointment);
router.post('/symptom-checker', symptomChecker);
router.get('/getUpcommingAppointments/:id', getUpcommingAppointments);
export default router;
