# Usar una imagen base de Node
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto por defecto de React (3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]