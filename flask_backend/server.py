from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import cv2

app = Flask(__name__)
CORS(app)

# Loading pneumonia detection model
pneumonia_model = tf.keras.models.load_model('pneumonia_detection_model.h5')

# Loading tuberculosis detection model
tb_model = tf.keras.models.load_model('tb_detection_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        image_data = request.files['image'].read()
        # Preprocessing the image data (resizing and normalizing) using OpenCV
        img_array = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (150, 150))
        img = img / 255.0  # Normalizing pixel values

        # Making pneumonia prediction
        pneumonia_prediction = pneumonia_model.predict(np.array([img]))

        return jsonify({'pneumonia_prediction': pneumonia_prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/tb_predict', methods=['POST'])
def tb_predict():
    try:
        print('Inside tb_predict')
        image_data = request.files['image'].read()
        # Preprocessing the image data (resizing and normalizing) using OpenCV
        img_array = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (150, 150))
        img = img / 255.0  # Normalizing pixel values

        # Making tuberculosis prediction
        tb_prediction = tb_model.predict(np.array([img]))

        return jsonify({'tb_prediction': tb_prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/chat_predict', methods=['POST'])
def predict_chat():
    data = request.get_json()
    text = data.get("message")
    # Replace the following line with your chat prediction logic
    response = "Replace this line with your chat prediction logic"
    message = {"answer": response}
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
