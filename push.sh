#!/bin/sh

echo "➡ Production Push started"

echo "➡ Pushing to Github"
git add . && git commit -m"$3 -via Push file"
git push origin master

echo "➡ Building Docker build image"
docker build -t mikegunyan/build .

echo "➡ Changing Dockerfile"
mv Dockerfile Dockerfile1
mv Dockerfile2 Dockerfile

echo "➡ Building Docker production image"
docker build . -t mikegunyan/tencentcheckers --secret id=npmrc,src=.npmrc

echo "➡ Resetting Dockerfile"
mv Dockerfile Dockerfile2
mv Dockerfile1 Dockerfile

echo "➡ Pushing to Dockerhub"
docker push mikegunyan/tencentcheckers

echo "➡ Removing Docker images"
docker rmi mikegunyan/tencentcheckers mikegunyan/build

echo "➡ Production Push complete"
ssh -i "../awsKeys/tencentcheckers.pem" ec2-user@ec2-54-219-137-236.us-west-1.compute.amazonaws.com 'bash -s'  < pull.sh $1 $2