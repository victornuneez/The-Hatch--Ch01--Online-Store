import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productsRoutes.js';
import adminRoutes from './routes/adminroutes.js';
import { PORT } from './config.js';
import { createSession } from './middleware/session.js';

const app = express();
const DB_URI ='mongodb://localhost:27017/web_repository';

// middleware que traduce al servidor los archivos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usamos sessiones para guardar la sesion del usuario.
app.use(createSession)

// Asignamos las rutas del servidor.
app.use('/api/products', productRoutes);
app.use('/auth', adminRoutes);


// Conectamos nuestro servidor a la base de datos
mongoose.connect(DB_URI)
    .then(() => console.log('Conexion exitosa a MongoDB'))
    .catch((error) => console.log('Error al conectar a MongoDB:', error))


app.listen(PORT, () => {
    console.log('Server run on http://localhost:3000')
})
