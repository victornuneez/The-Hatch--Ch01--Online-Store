import Product from "../models/productsCollection.js";


const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imgURL } = req.body;

        // Verificamos si ese nombre de producto ya existe en la base de datos.
        const existingProduct = await Product.findOne({ name : name});

        // Realizamos una accion si se cumple
        if (existingProduct) {
            // Buscamos los productos actuales para que la lista no aparezca vacia.
            const products = await Product.find();
            return res.render('admin/products', { products: products, error: "Ya existe un producto con ese nombre, prueba otro" })
        }

        const newProduct = new Product ({ name, description, price, stock, imgURL });
        await newProduct.save();

        // Todo salio bien, refrescamos la lista.
        res.redirect('/api/products');

    } catch (error) {
        const products = await Product.find();
        res.render('admin/products', {
            products: products,
            error: "Error al crear el producto" + error.message
        });
    }  
};


const getProducts = async (req, res) => {
    try {
        // Traemos todos los documentos existentes
        const products = await Product.find();

        res.render('admin/products', { products: products });

    } catch (error) {
        res.status(500).send("Error al obtener los productos" + error.message);
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        // Capturamos el caso de que no exista el producto solicitado
        if (!product) {
            const products = await Product.find();
            return res.render('admin/products', { products, error: "Producto no encontrado"})
        }

        // Renderizamos la vista a la edicion de productos
        res.render('admin/editProduct', { product: product })
    
    } catch (error) {
        res.status(500).send("Error al obtener el producto" + error.message);
    }
};


const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock} = req.body;
        
        const dataToUpdate = { name, description, price, stock}

        // MongoDB por defecto te devuelve el documento como estaba antes del cambio con {returnDocument:after} nos devuelve el documento con los cambios.
        const updatedProduct = await Product.findByIdAndUpdate(id, dataToUpdate, {returnDocument : 'after'})

        if (!updatedProduct) {
            return res.status(404).send("Producto no encontrado para actualizar");
        }

        // Una vez hechos los cambios redireccionamos a la lista de productos
        res.redirect('/api/products');
    
    } catch (error) {
        res.status(500).send("Hubo un error al actualizar" + error.message);
    }
};


const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);

        if (!deleteProduct) {
            const products = await Product.find();
            return res.render('admin/products', {products: products, error: "Producto no encontrado para eliminar"});
        }

        // redireccionamos a la lista de productos para ver los cambios.
        res.redirect('/api/products');
    
    } catch (error) {
        const products = await Product.find();
        res.render('admin/products', {products: products, error: "Error al eliminar el producto" + error.message})
    }
}

export { createProduct, getProducts, getProductById, updateProductById, deleteProductById }