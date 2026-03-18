// Herramienta que nos da los metodos para crear esquemas, modelos y conectarnos a la base de datos.
import mongoose from "mongoose";

// Este subesquema guarda un snapshot del producto al momento de realizarse la compra.(Historial de compras)
const purchaseHistorySchema = new mongoose.Schema({
    // ObjectId identificador unico que usa MongoDB usa para cada documento.
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Guardamos el ObjectId del producto comprado, 
                                                                                          // este ID hace referencia a un producto del documento Product.
    
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 }

}, { _id: false });