# Utiliser l'image officielle de Node.js comme base
FROM node:18.20.4

# Créer un répertoire pour l'application
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port que l'application utilise
EXPOSE 3003

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]

