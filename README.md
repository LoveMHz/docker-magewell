# docker-magewell

Ports
3200 - Web Interface
3202 - Video Stream
3204 - API
3206 - Internal Video Sink

ffmpeg -f v4l2 -framerate 25 -video_size 1280x720 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 1280x720 -b:v 1000k -bf 0 http://localhost:3206/supersecret