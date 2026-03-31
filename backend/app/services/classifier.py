import numpy as np
from PIL import Image
import tensorflow as tf
import io

from backend.app.config import CURRENT_MODEL, IMG_SIZE


class ImageClassifier:
    """Loads a trained model and classifies images as Real or AI-Generated."""

    def __init__(self, model_path=None):
        path = model_path or CURRENT_MODEL
        self.model = tf.keras.models.load_model(str(path))

    def predict(self, image_bytes: bytes) -> dict:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img = img.resize(IMG_SIZE)
        img_array = np.array(img, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)

        score = float(self.model.predict(img_array, verbose=0)[0][0])

        if score > 0.5:
            label = "REAL"
            confidence = score * 100
        else:
            label = "AI GENERATED"
            confidence = (1 - score) * 100

        return {
            "label": label,
            "confidence": round(confidence, 2),
            "raw_score": round(score, 4),
        }


# Singleton instance — loaded once at startup
classifier = ImageClassifier()
