import express from 'express';
const router = express.Router();
import {
  authUser,
  getPatientProfile,
  registerUser,
} from '../Controllers/patientController.js';
import { protect } from '../Middlewares/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getPatientProfile);
// router.post('/formSubmit', bookAppointment);

export default router;
