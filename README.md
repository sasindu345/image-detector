# AI vs. Real Image Classifier (CNN)

![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## Overview

This project is an end-to-end Machine Learning pipeline and web application designed to classify images as either **Real Photographs** or **AI-Generated Synthetic Images**.

The core of the project is a custom Convolutional Neural Network (CNN) trained from scratch on 60,000 images, served via a high-performance FastAPI backend, and accessible through a lightweight, vanilla JavaScript/HTML frontend.

## The Dataset

The model was trained on the [CIFAKE Dataset](https://www.kaggle.com/datasets/birdy654/cifake-real-and-ai-generated-synthetic-images) from Kaggle.

- **Total Images:** 60,000 (32x32 pixels)
- **Balance:** Perfectly balanced (50% Real, 50% AI-Generated)
- **Splits:** 50,000 Training images / 10,000 Testing images
- **Origin:** The "Real" images are sourced from CIFAR-10, while the "AI" images are generated using Latent Diffusion Models.

## Model Architecture

A custom CNN was built using TensorFlow/Keras to extract high-frequency mathematical artifacts left behind by AI image generators.

- **Input:** `32x32x3` (RGB Images)
- **Convolutional Layers:** 3 blocks of `Conv2D` + `MaxPooling2D` (32, 64, and 64 filters) using ReLU activation.
- **Classification Head:** A `Flatten` layer leading to a `Dense(64)` layer.
- **Regularization:** `Dropout(0.5)` applied to prevent overfitting.
- **Output:** `Dense(1)` with Sigmoid activation for binary classification (0 = AI, 1 = Real).

### Performance

- **Training Accuracy:** ~95.6%
- **Validation (Test) Accuracy:** ~93.9%

## Project Structure

```text
image_detector/
├── backend/                    # FastAPI server
│   └── app/
│       ├── main.py             # App entry point & middleware
│       ├── config.py           # Paths & settings
│       ├── routes/
│       │   └── predict.py      # /api/predict endpoint
│       └── services/
│           └── classifier.py   # Model loading & inference
├── frontend/                   # Vanilla HTML/CSS/JS UI
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── models/
│   └── weights/
│       └── cifake_classifier.h5
├── notebooks/
│   └── image_classification.ipynb
├── training/                   # Future: retraining & active learning
│   └── train.py
├── data/                       # Dataset directory (git-ignored)
├── run.py                      # Start the server
├── requirements.txt
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python run.py
```

### 3. Open the App

Navigate to [http://localhost:8000](http://localhost:8000) in your browser. Upload any image and click **Analyze Image** to classify it as Real or AI-Generated.

## API Usage

**POST** `/api/predict`

- **Body:** `multipart/form-data` with a `file` field containing the image.
- **Response:**
```json
{
  "label": "REAL",
  "confidence": 98.75,
  "raw_score": 0.9875
}
```
