// Herramienta que nos da los metodos para crear esquemas, modelos y conectarnos a la base de datos.
import mongoose from "mongoose";

// Este subesquema guarda un snapshot(copia) del producto al momento que se realizo la compra.(Historial de compras inmutable)
const purchaseHistorySchema = new mongoose.Schema({
    // Guardamos el ID para saber que producto era originalmente.(podemos relacionarlo con populate despues)
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Guardamos el ObjectId del producto comprado, 
                                                                                          // este ID hace referencia a un producto del documento Product.
    // Guardamos el nombre y el precio en el momento de la compra.(Esto no varia por mas cambios que se hagan en los productos)
    name: { type: String, required: true },
    unit_price: { type: Number, required: true, min: 0 },
    
    // Guardamos la cantidad y subtotal al momento de realzar la compra
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 }

    // No necesita un id, porque ira en el esquema dentro de orders como un campo.(ID de orders lo identificara al pedido completo)
}, { _id: false });


// Definimos el esquema de como de guardaran los pedidos.
const orderSchema = new mongoose.Schema({
    
    // Lista de productos comprados o producto. (Se guarda en forma de array si hay un pedido de varios productos)
    items: { type: [purchaseHistorySchema], required: true },

    // Monto tatal  de la compra(Suma total de los subtotales)
    total: { type: Number, required: true, min: 0 },

    // Datos del comprador(cliente)
    buyer_name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    
    // Estados de los pedidos 
    status: { type: String, enum: ['new', 'preparing', 'on_the_way', 'delivered'], default: 'new' }

    // Guardamos el momento en que se creo el pedido, y el momento de su ultima actualizacion.
}, {
    timestamps: true
})

// Creamos un objeto para crear y manipular un documento de esta collection.(Puente entre el codigo y la base de datos)
// Utiliza el esquema que definimos con sus validaciones para crear un Documento de la colleccion "orders".
const Order = mongoose.model('Order', orderSchema);
export default Order; 