import * as tf from '@tensorflow/tfjs-node';
async function testModelLoading() {
  const modelPath = 'pneumonia_detection_model.h5';

  try {
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('Model loaded successfully:', model);
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

testModelLoading();
