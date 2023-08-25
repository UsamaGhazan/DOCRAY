import express from 'express';
const router = express.Router();
import { pneumoniaDetection } from '../Controllers/dieaseDetectionControllers.js';
router.post('/pneumonia', pneumoniaDetection);
export default router;
