import cv2
import os
from deepface import DeepFace
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
import pandas as pd
from typing import List
import numpy as np
app = FastAPI()

# Load the CSV file into a pandas DataFrame and convert to a matrix of floats
try:
    df = pd.read_csv('ecg.csv')
    ecg_matrix = df.values.astype(float)
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error loading CSV file: {e}")

def ecg_row_generator():
    """Generator function to yield ECG rows one by one."""
    for row_d in ecg_matrix:
        yield row_d.tolist()

# Create a generator instance
generator = ecg_row_generator()

@app.get("/ecg")
async def read_ecg():
    """
    Get the next row of ECG data as a matrix of floats.
    :return: A row of ECG data
    """
    try:
        row = next(generator)  # Get the next row from the generator
        return {"data": row}
    except StopIteration:
        raise HTTPException(status_code=404, detail="No more ECG rows available.")

rtsp_url = "rtsp://172.16.1.41:8554/mystream"
app = FastAPI()
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

if __name__ == "__main__" :
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=4000) 