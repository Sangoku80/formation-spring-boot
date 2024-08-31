#!/bin/bash

# demande de la commande pour se connecter au serveur
echo "Commande pour la connection:"
read command
$command

# demande du lien github du projet à mettre dans le serveur
echo "Lien du projet github:"
read project

# installer les packages
sudo apt update
sudo apt install git
sudo apt install docker.io
sudo apt install docker-compose

if ls | grep -q "$project"; then
  echo "Le projet existe déjà"
  sudo rm -rf project
  echo "Projet supprimé"
fi

# on clone le projet
echo "Clonage du projet"

# on crée le commande pour cloner le projet
clone_command="git clone $project"

# on l'éxécute
$clone_command

# aller dans le projet
cd $(basename -s .git $project)


