import cv2
import numpy as np
from deepface import DeepFace
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
app = FastAPI()

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# Path to the image file
image_path = "test.jpg"

# Read the image using OpenCV
frame = cv2.imread(image_path)
@app.get("/emotions")
def predictions():
    # Convert frame to grayscale

    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Convert grayscale frame to RGB format
    rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)
    result = DeepFace.analyze(rgb_frame, actions=['emotion'], enforce_detection=False)
    # Determine the dominant emotion
    print(result)
    #emotion = result[0]['dominant_emotion']
    return result


class MatrixResponse(BaseModel):
    matrix: list[list[float]]

@app.get("/sensors")
def get_matrix(rows: int = 10, cols: int = 10):
    if rows <= 0 or cols <= 0:
        raise HTTPException(status_code=400, detail="Rows and columns must be positive integers.")

    # Generate a random matrix
    matrix = np.random.rand(rows, cols).tolist()

    return MatrixResponse(matrix=matrix)




if __name__ == "__main__" :
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=4000)


