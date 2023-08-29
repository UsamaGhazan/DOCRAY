from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import tensorflow as tf
import cv2

app = Flask(__name__)
CORS(app)  
# Loading model
model = tf.keras.models.load_model('pneumonia_detection_model.h5')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        image_data = request.files['image'].read()

        
        # Preprocessing the image data (resizing and normalizing) using opencv
        img_array = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (150, 150))
        img = img / 255.0  # Normalizing pixel values
        
        # Making prediction
        prediction = model.predict(np.array([img]))
        
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8000)

