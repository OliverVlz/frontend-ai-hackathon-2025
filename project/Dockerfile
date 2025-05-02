# Etapa 1: Build de la aplicación
FROM node:23-bookworm-slim AS builder

WORKDIR /app

# Copiamos package.json y package-lock.json para instalar las dependencias
COPY package.json package-lock.json ./

RUN npm install

# Instalamos Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiamos el código fuente de la aplicación
COPY . .

# Compilamos la app en modo producción
RUN npm run build -- --configuration=production

# Etapa 2: Servir la app con Nginx
FROM nginx:alpine

# Eliminamos la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos la app compilada desde la etapa de build
COPY --from=builder /app/dist/project /usr/share/nginx/html

# Exponemos el puerto 80 para servir la app
EXPOSE 80

# Iniciamos Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"]
