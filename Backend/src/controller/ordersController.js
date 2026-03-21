
import Order from '../models/ordersCollection.js';

const getOrders = async (req, res) => {
    try {
        // Usamos sort con CreatedAt -1 para que los pedidos nuevos esten arriba.
        const orders = await Order.find().sort({ createdAt: -1 });

        // Renderizamos el dashboard y le pasamos los datos
        res.render('admin/dashboard', { orders: orders });

    } catch (error) {
        res.status(500).send("Error al obtener los pedidos" + error.message );
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Actualizamos el estado en la base de datos.
        await Order.findByIdAndUpdate(id, { status: status });

        // Redirigimos al panel para que se vean los cambios.
        res.redirect('/api/orders')

    } catch(error) {
        res.status(500).send("Error al actualzar estado" + error.message );
    }
}

export { getOrders, updateOrderStatus };