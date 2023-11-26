from PIL import Image
import os
import numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras import layers, models

def load_and_preprocess(folder_path, image_size=(150, 150)):
    images = []
    labels = []
    
    for label, class_folder in enumerate(os.listdir(folder_path)):
        class_path = os.path.join(folder_path, class_folder)
        
        for image_file in os.listdir(class_path):
            image_path = os.path.join(class_path, image_file)
            
            # Load image using Pillow
            image = Image.open(image_path)
            
            # Resize image
            image = image.resize(image_size)
            
            # Normalize pixel values to be in the range [0, 1]
            image = np.array(image) / 255.0
            
            images.append(image)
            labels.append(label)  # Assign label based on class folder
            
    return np.array(images), np.array(labels)

# Load and preprocess images
normal_images, normal_labels = load_and_preprocess('E:\\Tb_images\\Normal')
tb_images, tb_labels = load_and_preprocess('E:\\Tb_images\\Tuberculosis')

# Concatenate normal and TB images and labels
all_images = np.concatenate((normal_images, tb_images), axis=0)
all_labels = np.concatenate((normal_labels, tb_labels), axis=0)

# Split the dataset into training and testing sets
train_images, test_images, train_labels, test_labels = train_test_split(
    all_images, all_labels, test_size=0.2, random_state=42
)

# Build the CNN model
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(128, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Flatten())
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(1, activation='sigmoid'))

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(train_images, train_labels, epochs=10, batch_size=32, validation_split=0.2)

# Evaluate the model
test_loss, test_acc = model.evaluate(test_images, test_labels)
print(f'Test accuracy: {test_acc}')

# Save the model to an .h5 file
model.save('tb_detection_model.h5')
