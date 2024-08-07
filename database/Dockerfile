# Utiliser l'image officielle de MongoDB comme base
FROM mongo:latest

# Définir les variables d'environnement
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=mongopass
ENV MONGO_INITDB_DATABASE=authentication

# Exposer le port 27017 pour MongoDB
EXPOSE 27017

# Définir un volume nommé pour les données MongoDB
VOLUME /data/db

# Commande pour lancer le serveur MongoDB
CMD ["mongod"]

