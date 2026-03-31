from fastapi import APIRouter, UploadFile, File

from backend.app.services.classifier import classifier

router = APIRouter()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    result = classifier.predict(contents)
    return result
