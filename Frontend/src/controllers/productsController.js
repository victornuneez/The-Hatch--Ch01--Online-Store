import Product from "../models/productsCollection.js";

const getProducts = async (req, res) => {
    try{    
        // Con lean() no le permitimos a Mongoose que devuelva documentos sino que transforma esos documentos en objetos JS.
        // Hacemos esto porque necesitamos usarlos rapido para mostrarlos a la vista.
        const products = await Product.find({ is_active: true }).lean()

        console.log(`Se encontraron ${products.length} productos`)

        res.render('index', { title: 'Tienda Online', products: products});

    } catch(error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error en el servidor');
    }
}

export { getProducts };