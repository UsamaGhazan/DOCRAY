import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path'; // Import the path module
import multer from 'multer';
// Load the trained model using an absolute path
const modelPath = '../../pneumonia_detection_model.h5';

async function loadModel() {
  try {
    console.log('Inside load model');
    const model = await tf.loadLayersModel(`file://${modelPath}`);

    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

const img_width = 150;
const img_height = 150;

// Set up multer storage for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const pneumoniaDetection = asyncHandler(async (req, res) => {
  console.log('Inside pneumonia detection');
  try {
    console.log('req.file ', req.file); // Check if req.file contains the uploaded data

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const imageBuffer = req.file.buffer;
    // Preprocess the image data
    const resizedImageData = await sharp(imageBuffer)
      .resize(img_width, img_height)
      .toBuffer();

    const normalizedImageData = Array.from(resizedImageData).map(
      (pixel) => pixel / 255
    );

    // Converting normalizedImageData to a TensorFlow tensor
    const tensorData = tf.tensor(normalizedImageData);
    const model = await loadModel();
    console.log('Before data prediction');
    // Mak pringediction using the loaded model
    const prediction = model.predict(tensorData);
    console.log('After data prediction');

    // Converting the prediction tensor to a JavaScript array
    const predictionArray = prediction.arraySync();
    const responseData = { prediction: predictionArray };
    console.log('Response Data:', responseData); // Add this line

    // Sending the prediction result back to the frontend
    res.json({ prediction: predictionArray });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

export { pneumoniaDetection };
