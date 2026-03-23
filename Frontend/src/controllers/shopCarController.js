import Product from "../models/productsCollection.js";
import Order from "../models/ordersCollection.js";

const shopCart = async (req, res) => {
    try {

        // Extraemos el id del producto que viene del formulario
        const { id } = req.body;

        // Usamos lean para devolver un objeto JS rapido para usar.
        const product = await Product.findById(id).lean();

        if (!product) {
            return res.status(404).send('Producto no encontrado');    
        }

        // Guardamos el producto en forma de lista para que el each de Pug funcione
        const productsInCart = [product];
        const total = product.price;

        res.render('shopCart', { title: 'Tu carrito de compras', products: productsInCart, total: total });
    
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        res.status(500).send('Error al preparar el carrito');
    }
}; 

const confirmOrder = async (req, res) => {
    try {
        // Extraemos los datos que vienen del formulario del carrito.
        const { productId, buyer_name, email, address } = req.body;

        // Buscamos el producto en la DB, por seguridad para confirmar el precio y nombre del producto.
        const productData = await Product.findById(productId).lean();

        if (!productData) {
            return res.satus(404).send('El producto ya no esta disponible');
        }

        const itemInfo = { 
            product_id: productData._id, 
            name: productData.name, 
            unit_price: productData.price, 
            quantity: 1, 
            subtotal: productData.price * 1 
        };

        // El status ya no lo ponemos porque por default se pone en New
        const newOrder = new Order({ items: [itemInfo], total: itemInfo.subtotal, buyer_name: buyer_name, address: address, email: email });

        // Guardamos en la DB la orden de compra.
        await newOrder.save();

        res.send(
            `<h1>Gracias por tu compra, ${buyer_name} </h1>
            <p>Tu pedido lo vamos a enviar a tu direccion en: ${address} </p>
            <a href="/products">Back to store</a>
        `);

    } catch (error) {
        console.error('Error al guardar la orden:', error.message);
        res.status(500).send('Hubo un problema al procesar tu orden');
    }
}

export { shopCart, confirmOrder };