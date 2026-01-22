#!/bin/bash

# Usage:
# ./deploy.sh <service-name> <port> <docker-image>

SERVICE_NAME=$1
PORT=$2
IMAGE=$3

if [ -z "$SERVICE_NAME" ] || [ -z "$PORT" ] || [ -z "$IMAGE" ]; then
  echo "❌ Usage: ./deploy.sh <service-name> <port> <docker-image>"
  exit 1
fi

echo "🚀 Deploying $SERVICE_NAME on port $PORT..."

docker pull $IMAGE

docker stop $SERVICE_NAME || true
docker rm $SERVICE_NAME || true

docker run -d \
  --name $SERVICE_NAME \
  -p $PORT:3000 \
  --restart always \
  $IMAGE

echo "✅ $SERVICE_NAME deployed successfully"

