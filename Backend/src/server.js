import dotenv from 'dotenv';
import express from 'express';
import productRoutes from './routes/productsRoutes.js';
import adminRoutes from './routes/adminroutes.js';
import orderRoutes from './routes/ordersRoutes.js';
import methodoverride from 'method-override';
import { createSession } from './middleware/session.js';
import { connectDB } from './config.js';
import { fileURLToPath} from 'url'; // funcion que convierte uns URL a una ruta de sistema
import path from 'path'; // herramienta para manejar rutas de archivos sin importar el Os
import morgan from 'morgan'; // logs de peticiones


dotenv.config();
const PORT = process.env.PORT

const app = express();
connectDB();

// Obtenemos la ruta absoluta de la carpeta donde esta server, sirve para que el servidor pueda acceder a los demas archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le decimos a express en donde estan las vistas(Carpeta)
app.set('views', './views');

// Le decimos que el motor de renderizado es Pug
app.set('view engine', 'pug');

// servimos los archivos estaticos al navegador.
app.use(express.static(path.join(__dirname, 'public'))); 

// middleware que traduce al servidor los archivos JSON
app.use(express.json());
// Sirve para que el servidor entienda los datos que vengan de un formulario
app.use(express.urlencoded({ extended: true }));
// Permite que el metodo "POST" de un formulario se convierta en PUT o DELETE usando "_method"
app.use(methodoverride('_method'));


// Usamos sessiones para guardar la sesion del usuario.
app.use(createSession)
// log de peticiones
app.use(morgan('dev'));

// RUTAS del servidor.
app.use('/api/products', productRoutes);
app.use('/auth', adminRoutes);
app.use('/api/orders', orderRoutes);


app.listen(PORT, () => {
    console.log('Server run on http://localhost:3000')
})
