import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productsRoutes.js';
import adminRoutes from './routes/adminroutes.js';
import { PORT, DB_URI } from './config.js';
import { createSession } from './middleware/session.js';
import orderRoutes from './routes/ordersRoutes.js';
import methodoverride from 'method-override';

const app = express();

// Le decimos a express en donde estan las vistas(Carpeta)
app.set('views', './views');

// Le decimos que el motor de renderizado es Pug
app.set('view engine', 'pug');


// middleware que traduce al servidor los archivos JSON
app.use(express.json());
// Sirve para que el servidor entienda los datos que vengan de un formulario
app.use(express.urlencoded({ extended: true }));
// Permite que el metodo "POST" de un formulario se convierta en PUT o DELETE usando "_method"
app.use(methodoverride('_method'));


// Usamos sessiones para guardar la sesion del usuario.
app.use(createSession)

// Asignamos las rutas del servidor.
app.use('/api/products', productRoutes);
app.use('/auth', adminRoutes);
app.use('/api/orders', orderRoutes);


// Conectamos nuestro servidor a la base de datos
mongoose.connect(DB_URI)
    .then(() => console.log('Conexion exitosa a MongoDB'))
    .catch((error) => console.log('Error al conectar a MongoDB:', error))


app.listen(PORT, () => {
    console.log('Server run on http://localhost:3000')
})
