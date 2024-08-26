#!/bin/bash

# Variables
AWS_REGION="us-east-1"
ECR_REGISTRY="public.ecr.aws/z7r7i4z0"
REPOSITORIES=(
"formation-spring-boot-frontend"
"formation-spring-boot-app"
"adminer"
"mariadb"
) # Liste des noms des images Docker à traiter

# Authentifier Docker auprès d'ECR Public
echo "Authenticating Docker to AWS ECR Public..."
aws ecr-public get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$ECR_REGISTRY"
if [ $? -ne 0 ]; then
  echo "Failed to authenticate Docker to ECR."
  exit 1
fi

# Traiter chaque image
for REPO in "${REPOSITORIES[@]}"; do
  echo "Processing repository: $REPO"

  # Vérifier si l'image existe localement
  if ! docker images --format '{{.Repository}}' | grep -q "^$REPO$"; then
    echo "Image $REPO does not exist locally. Building..."
    docker build -t "$REPO" .
    if [ $? -ne 0 ]; then
      echo "Failed to build image $REPO."
      exit 1
    fi
  fi

  # Taguer l'image pour le registre ECR Public
  echo "Tagging image $REPO for ECR..."
  docker tag "$REPO:latest" "$ECR_REGISTRY/$REPO:latest"
  if [ $? -ne 0 ]; then
    echo "Failed to tag image $REPO."
    exit 1
  fi

  # Pousser l'image vers ECR Public
  echo "Pushing image $REPO to ECR..."
  docker push "$ECR_REGISTRY/$REPO:latest"
  if [ $? -ne 0 ]; then
    echo "Failed to push image $REPO to ECR."
    exit 1
  fi
done

echo "All images processed successfully."
