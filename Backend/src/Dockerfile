# Le estamos diciendo a docker con FROM que nos de una PC peqquenha que tenga linux y node:24 instalados para solo copiar el codigo adentro.
# alpine es una version liviana de linux, para que nuestro contenedor sea pequenho y rapido
FROM node:24-alpine 

# Creamos la carpeta dentro del contenedor en donde vamos a meter nuestro codigo. Todos los siguientes comandos se ejecutan ahi.
WORKDIR /app

# Copiamos los package.json y package-lock.json solo los archivos de dependencias dentro de la carpeta Backend
# Esto sirve para aprovechar la cache docker, asi si cambiamos de codigo pero no las dependencias, no se vuelve a hacer un "npm install"
COPY package*.json ./

# Instalamos todas las dependencias dentro del contenedor
RUN npm install

# Copiamos todo el resto del codigo, ahora el contenedor tiene todo el proyecto listo para ejecutarse
COPY . .

# Le decimos a Docker que la app va a usar el puerto 3000. 
# Esto no usa el puerto por si solo, sirve para conectar al host cuando se hace "docker run -p 3000:3000" 
EXPOSE 3000

# Comando que se ejecuta cuando el contenedor arranca
CMD ["npm", "run", "dev"]



