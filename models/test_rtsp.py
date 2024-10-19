import cv2

# Replace with your RTSP stream URL
rtsp_url = "rtsp://172.16.1.41:8554/mystream"

# Open the video stream
cap = cv2.VideoCapture(rtsp_url)

if not cap.isOpened():
    print("Error: Could not open video stream.")
    exit()

# Read a single frame
ret, frame = cap.read()

if ret:
    # Display the frame
    cv2.imshow('Frame', frame)

    # Save the frame to a file (optional)
    cv2.imwrite('captured_frame.jpg', frame)

    # Wait for a key press and close the window
    cv2.waitKey(0)
    cv2.destroyAllWindows()
else:
    print("Error: Could not read a frame.")

# Release the video capture object
cap.release()

