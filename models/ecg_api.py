from fastapi import FastAPI, HTTPException
import pandas as pd
from typing import List

app = FastAPI()

# Load the CSV file into a pandas DataFrame and convert to a matrix of floats
try:
    df = pd.read_csv('ecg.csv')
    ecg_matrix = df.values.astype(float)
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error loading CSV file: {e}")

def ecg_row_generator():
    """Generator function to yield ECG rows one by one."""
    for row in ecg_matrix:
        yield row.tolist()

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

@app.get("/")
async def root():
    return {"message": "Welcome to the ECG API. Use /ecg to get the next ECG row."}

