from pathlib import Path

# Project root directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Model settings
MODEL_DIR = BASE_DIR / "models" / "weights"
CURRENT_MODEL = MODEL_DIR / "cifake_classifier.h5"

# Image preprocessing
IMG_SIZE = (32, 32)

# Frontend
FRONTEND_DIR = BASE_DIR / "frontend"
