// Importamos mongoose que es nuestro traductor, porque MongoDB habla BSON(binario) y nosotros con objetos JavaScript.
import mongoose  from "mongoose";

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, 
    role: { type: String, required: true ,trim: true }
}, {
    timestamps : true,
    versionKey : false
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;