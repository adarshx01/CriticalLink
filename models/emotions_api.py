import cv2
from deepface import DeepFace
from fastapi import FastAPI, HTTPException
app = FastAPI()

rtsp_url = "rtsp://172.16.1.41:8554/mystream"
@app.get("/emotions")
async def predictions():
    cap = cv2.VideoCapture(rtsp_url)
    if not cap.isOpened():
        return {}    
    ret, frame = cap.read()
    cap.release()
    # gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)
    result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
    return result
