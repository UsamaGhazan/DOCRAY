import express from 'express';
const router = express.Router();

import {
  getAllDoctors,
  getSingleDoctor,
  createDoctorReview,
  registerDoctor,
  authDoctor,
} from '../Controllers/doctorController.js';
import { protect } from '../Middlewares/authMiddleware.js';
router.get('/', getAllDoctors);
router.post('/login', authDoctor);
router.post('/', registerDoctor);
router.post('/:id/reviews', protect, createDoctorReview);
router.get('/:id', getSingleDoctor);

export default router;
