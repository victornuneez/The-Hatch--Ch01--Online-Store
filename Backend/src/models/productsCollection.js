// Importamos la herramienta para definir la estructura de la collection
import mongoose from "mongoose";

// Definimos el esquema de la collection Products
const productSchema = new mongoose.Schema({
    
    name: { type: String, required: true, trim: true, unique: true },     // trim limpia los espacios que pueda enviar el usuario
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },        // Con min 0 evitamos que por error se defina un precio negativo.
    stock: { type: Number, required: true, min: 0, default: 0 },    // Asignamos un valor por defecto oon default 
    imgURL: { type: String, default: '/uploads/default-fish.png' },
    is_active: { type: Boolean, default: true }                     // Este campo activa o desactiva a la venta el producto, sin eliminar y romper nada.
}, 
    // Con la segunda llave activamos las configuraciones de la collection.
    {
    // Crea create_at y update_at automaticamente. (create_at = fecha y hora exacta que se creo el producuto), (update_at = guarda la fecha y hora de la ultima actualizacion del prod)
    timestamps: true,
    versionKey: false // Apagamos el campo __v para controlar versiones internas, para que la collection se vea mas limpia.
});

// Creamos el modelo que representa la collection "products" basado en el Schema que definimos. 
// para usar sus metodos y para poder manejar la collection desde nuestro codigo.
const Product = mongoose.model('Product', productSchema);
export default Product;



// "model" objeto que tiene los metodos para manejar una collection de la base de datos.