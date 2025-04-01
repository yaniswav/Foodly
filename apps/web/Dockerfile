# Utiliser une image de base Node.js
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copier le reste du projet
COPY . .

# Construire l'application Next.js ou Remix
RUN npm run build

# Utiliser une image légère Nginx pour servir l'app
FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]