#!/bin/bash
# replace file.mp4 with your own file
gst-launch-1.0 rtspclientsink name=s location=rtsp://localhost:8554/mystream filesrc location=video.mp4 \
! qtdemux name=d d.video_0 ! queue ! s.sink_0 d.audio_0 ! queue ! s.sink_1


