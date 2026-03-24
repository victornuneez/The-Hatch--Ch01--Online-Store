import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Conexion exitosa a la base de datos.');

    } catch (error) {
        console.error('Error de conexion:', error.message);
        process.exit(1);
    }
};

export { connectDB };