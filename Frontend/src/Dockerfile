# Con FROM decimos que queremos comenzar con una imagen que ya tenga linux(alpine) y node 24 instalados
# Es como obtener una mini PC con linux y node.js, es la base donde se contruye todo lo demas.
FROM node:24-alpine

# Creamos la carpeta dentro del contenedor donde se ejecutaran los demas comandos
WORKDIR /app

# "./" significa la carpeta actual, entonces las dependencias las copiamos dentro de Frontend.
# "*" comodin que significa todos los archivos que comiencen con packagey terminen en json.
COPY package*.json ./

# Instala las todas las dependencias dentro del contenedor.
RUN npm install 

# el primer punto significa la carpeta actual donde esta Dockerfile, el segundo punto significa la carpeta del contenedor
# Significa copiar todo lo que hay dentro de la carpeta donde esta el proyecto y ponelo dentro de la carpeta del contenedor(Frontend)
COPY . .

# Le indicamos a la app que usara el puerto 4000
EXPOSE 4000 

# Comando que se ejecuta cuando el contenedor arranca.
CMD ["npm", "run", "dev"]