import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

async function testModelLoading() {
  const modelArchitecturePath =
    'c:\\Users\\USAMA\\Desktop\\DOCRAY\\convertedModel\\model.json';

  const modelWeightsPath = path.join(
    'c:',
    'Users',
    'USAMA',
    'Desktop',
    'DOCRAY',
    'convertedModel'
  );

  try {
    const model = await tf.loadLayersModel(
      'c:\\Users\\USAMA\\Desktop\\DOCRAY\\convertedModel\\model.json'
    );
    console.log('Model loaded successfully:', model);
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

testModelLoading();
