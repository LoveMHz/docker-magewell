#!/bin/bash

# Frontend
nohup /docker-magewell/frontend/node_modules/.bin/vue-cli-service serve --port 3200 /docker-magewell/frontend/src/main.js &>/dev/null &

# Server
nohup node /docker-magewell/server/dist/api.js &>/dev/null &
nohup node /docker-magewell/server/dist/websocket-relay.js supersecret 3206 3202 &>/dev/null &

# Video Sink
nohup ffmpeg -f v4l2 -framerate 25 -video_size 1280x720 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 1280x720 -b:v 1000k -bf 0 http://localhost:3206/supersecret &>/dev/null &

sleep infinity
