import express from 'express';
const router = express.Router();
import multer from 'multer';
import { pneumoniaDetection } from '../Controllers/dieaseDetectionControllers.js';

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

router.post('/pneumonia', upload.single('image'), pneumoniaDetection);
export default router;
