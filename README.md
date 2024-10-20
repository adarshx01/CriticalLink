Video streaming device
```
# rtsp_sink.sh
    binds the video to rtsp server 
    should be executed on the edge device or the host whil will stream video
```
Video Server to serve stream to multiple users
```
# rtsp_server
    run ./mediamtx on the server which will serve the video streams to multiple clients
    it should be executed before rtsp_link otherwise frames will be lost
```

# test the rtsp stream 
    do it on client device or your own system for testing
    gst-play-1.0 rtsp://your-ip:8554/mystream 