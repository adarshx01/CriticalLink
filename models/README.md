# Only for testing

Run uvicorn ecg_api:app --port [port number] 
And run this in seperate shell ( uvicorn emotions_api:app --port [port number])

# ecg_api 
    simulate a streams ecg signal data

# emotions_api
    fetch the current frame from rtsp server and process it and returns types of emotions
    