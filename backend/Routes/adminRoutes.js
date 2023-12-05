import express from 'express';
const router = express.Router();
import { protect } from '../Middlewares/authMiddleware.js';
import {
  authAdmin,
  deleteDoctor,
  deletePatient,
  getAllAppointments,
  totalDocAndPat,
} from '../Controllers/adminController.js';
router.post('/login', authAdmin);
router.delete('/:id', protect, deleteDoctor);
router.delete('/:id', protect, deletePatient);
router.get('/appointments', getAllAppointments);
router.get('/totalDocAndPat', totalDocAndPat);

export default router;
