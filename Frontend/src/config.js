import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Conexion exitosa a la base de datos');

    } catch (error) {
        console.error('Error de conexion:', error.message);
        // Corta la ejecucion del servidor si hubo un error al conectarse a la base de datos.
        // Para que no se ejecute el servidor si no se puede conectar a la DB
        process.exit(1);
    }
};

export { connectDB };