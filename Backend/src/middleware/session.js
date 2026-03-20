//`express-session` es un middleware que intercepta cada request y crea/valida la sesion automaticamente.

import session from "express-session";
import { SESSION_KEY } from "../config.js";

const createSession = session({
    secret: SESSION_KEY,          // clave secreta que firma la session para que nadie la falsifique
    resave: false,               // No guarda la session si no hubo cambios
    saveUninitialized: false,    // No crea sesiones vacias para usuarios que no hacen login
    cookie: {
        httpOnly: true,          // El navegador no puede leer la cookie
        maxAge: 3600000,          // La sesion dura 1 hora
        secure: false,
        sameSite: 'lax'
    }
});

export { createSession };