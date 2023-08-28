from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import cv2

app = Flask(__name__)

# Load the pre-trained model
model = tf.keras.models.load_model('pneumonia_detection_model.h5')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image data from the request
        image_data = request.files['image'].read()
        
        # Preprocess the image data (resize and normalize)
        img_array = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (150, 150))
        img = img / 255.0  # Normalize pixel values
        
        # Make prediction using the loaded model
        prediction = model.predict(np.array([img]))
        
        # Return the prediction as JSON
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8000)

