// Definimos el mismo esquema que tenemos en el panel de admin.
// Porque necesitamos tener el miso esquema con los campos identicos para que no haya errores a la hora de visualizar los productos de la tienda

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description : { type: String, default: ''},
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    imgURL: { type: String, default: '/uploads/default-fish.png'},
    is_active: {type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
}); 

const Product = mongoose.model('Product', productSchema);
export default Product;