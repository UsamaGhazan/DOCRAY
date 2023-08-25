import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import * as tf from '@tensorflow/tfjs-node';

// Load the trained model using an absolute path
const modelPath = 'pneumonia_detection_model.h5';

async function loadModel() {
  const model = await tf.loadLayersModel(`file://${modelPath}`);
  return model;
}

const img_width = 150;
const img_height = 150;
const pneumoniaDetection = asyncHandler(async (req, res) => {
  console.log('Inside pneumonia detection');
  try {
    console.log(req.body);
    const imageData = req.body.imageData;
    console.log(imageData);
    // Preprocess the image data
    const resizedImageData = await sharp(imageData)
      .resize(img_width, img_height)
      .toBuffer();

    const normalizedImageData = Array.from(resizedImageData).map(
      (pixel) => pixel / 255
    );

    // Converting normalizedImageData to a TensorFlow tensor
    const tensorData = tf.tensor(normalizedImageData);
    const model = await loadModel();

    // Mak pringediction using the loaded model
    const prediction = model.predict(tensorData);

    // Converting the prediction tensor to a JavaScript array
    const predictionArray = prediction.arraySync();

    // Sending the prediction result back to the frontend
    res.json({ prediction: predictionArray });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

export { pneumoniaDetection };
