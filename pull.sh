#!/bin/sh

echo "➡ Production Pull started"
echo "➡ Removing old container"
docker rm -f mike

echo "➡ Removing old image"
docker rmi mikegunyan/tencentcheckers

echo "➡ Pulling new image"
docker pull mikegunyan/tencentcheckers

echo "➡ Starting new container"
docker run -d -p 80:3000 --env HOST=$1 --env SESSION_SECRET=$2 --name mike mikegunyan/tencentcheckers

echo "➡ Production Pull complete"