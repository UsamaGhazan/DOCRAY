import express from 'express';
const router = express.Router();
import {
  getAllDoctors,
  getSingleDoctor,
} from '../Controllers/doctorController.js';
router.get('/', getAllDoctors);

router.get('/:id', getSingleDoctor);

export default router;
