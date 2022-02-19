FROM ubuntu:18.04

# Web Interface
EXPOSE 3200 3202 3204

# TODO: Get Magewell tools
# docker cp /usr/bin/mwcap-info (DOCKER_ID):/usr/bin/mwcap-info
# docker cp /usr/local/share/ProCapture (DOCKER_ID):/usr/local/share/ProCapture

# Update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt -y update && apt -y upgrade

# Install packages
RUN apt -y install ffmpeg curl

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt -y install -y nodejs

# Copy files over
COPY . /docker-magewell

# File premissions
RUN chmod +x /docker-magewell/runner.sh

# Build server
WORKDIR /docker-magewell/server
RUN npm i
RUN npm run build

# Build frontend
WORKDIR /docker-magewell/frontend
RUN npm i
RUN npm run build

ENTRYPOINT [ "/docker-magewell/runner.sh" ]
CMD [ "/bin/bash" ]
