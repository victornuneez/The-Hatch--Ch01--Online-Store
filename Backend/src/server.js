import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productsRoutes.js';

const app = express();
const DB_URI ='mongodb://localhost:27017/web_repository';

// middleware que traduce al servidor los archivos JSON
app.use(express.json());
app.use('/api/products', productRoutes)

// Conectamos nuestro servidor a la base de datos
mongoose.connect(DB_URI)
    .then(() => console.log('Conexion exitosa a MongoDB'))
    .catch((error) => console.log('Error al conectar a MongoDB:', error))


app.listen(3000, () => {
    console.log('Server run on http://localhost:3000')
})