# Étape 1 : Utiliser une image Node pour le build
FROM node:18-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet
COPY . .

# Exécuter le build de l'application avec Vite
RUN npm run build

# Étape 2 : Utiliser une image légère Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers buildés de l'étape précédente vers le répertoire Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
