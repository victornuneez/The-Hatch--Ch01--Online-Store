//`express-session` es un middleware que intercepta cada request y crea/valida la sesion automaticamente.
import dotenv from 'dotenv';
dotenv.config(); 

import session from "express-session";
import MongoStore from 'connect-mongo';

const SESSION_KEY = process.env.SESSION_KEY;
const DB_URI = process.env.DB_URI;
console.log(DB_URI)

const createSession = session({
    secret: SESSION_KEY,          // clave secreta que firma la session para que nadie la falsifique
    resave: false,               // No guarda la session si no hubo cambios
    saveUninitialized: false,    // No crea sesiones vacias para usuarios que no hacen login

    // Guardamos la session en MongoDB
    store: MongoStore.create({
        mongoUrl : DB_URI,
        collectionName: 'sessions',
        ttl: 60 * 60                // (TIME TO LIVE) tiempo de vida de la sesion 1 h.(MongoDB lo elimina automaticamente al pasar el tiempo)
        
    }),

    cookie: {
        httpOnly: true,          // El navegador no puede leer la cookie
        maxAge: 3600000,          // La sesion dura 1 hora
        secure: false,
        sameSite: 'lax'
    }
});

export { createSession };