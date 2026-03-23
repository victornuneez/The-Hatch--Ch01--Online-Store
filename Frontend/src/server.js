import express, { urlencoded } from 'express'; 
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config.js';
import productRoutes from './routes/productsRoutes.js';
import shopCartRoutes from './routes/shopCartRoutes.js';

// Configuraciones iniciales
// Habilitamos las variables de entorno a todo el codigo.
dotenv.config();
const app = express();

// Ejecutamos la funcion que se conecta a la base de datos.
connectDB();
const PORT = process.env.PORT

// Configuraciones de rutas para archivos estaticos(CSS, Imagenes)
// Obtenemos la ruta completa del archivo actual y la convertimos en una ruta normal para utilizarla
const __filename = fileURLToPath(import.meta.url);

// Obtenemos la carpeta donde esta el archivo actual(SRC)
const __dirname = path.dirname(__filename);

// Configuracion de motor de plantillas(Views)
// Le decimos a express que utilice el motor de plantillas Pug para renderizar datos.
app.set('view engine', 'pug');

// Le decimos a express que vaya a la carpeta views del proyecto y que la use para buscar las vistas.
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());

// Convierte los datos que llegan desde el formulario en datos que se puedan usar en "req.body". "extended:true" Permite enviar datos mas complejos.
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'))

// Le decimos a express que agarre los archivos estaticos que estan en la carpeta public y que deje al navegador acceder a sus archivos.
app.use(express.static(path.join(__dirname, 'public')));

// Rutas del servidor.
app.use('/', productRoutes);
app.use('/', shopCartRoutes)


app.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`);
});
