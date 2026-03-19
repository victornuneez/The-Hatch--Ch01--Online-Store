import Product from "../models/productsCollection.js";


const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imgURL } = req.body;

        // Verificamos si ese nombre de producto ya existe en la base de datos.
        const existingProduct = await Product.findOne({ name : name});

        // Realizamos una accion si se cumple
        if (existingProduct) {
            return res.status(400).json({ message: "Ya existe un producto con ese nombre, prueba otro"})
        }

        const newProduct = new Product ({ name, description, price, stock, imgURL });
        const savedProduct = await newProduct.save();

        res.status(201).json({message:"Producto creado exitosamente", savedProduct});

    } catch (error) {
        res.status(400).json({
            message: "Error al crear el producto",
            error: error.message
        });
    }  
};


const getProducts = async (req, res) => {
    try {
        // Traemos todos los documentos existentes
        const products = await Product.find();

        res.status(200).json({ message: "Lista de Productos", list: products });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        // Capturamos el caso de que no exista el producto solicitado
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado"})
        }

        res.status(200).json({ message: "Producto encontrado", item: product });
    
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error: error.message });
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
            return res.status(404).json({ message: "Producto no encontrado para actualizar"});
        }

        res.status(200).json({ message: "Producto actualizado correctamente", item: updatedProduct});
    
    } catch (error) {
        res.status(500).json({ message: "Hubo un error al actualizar", error: error.message });
    }
};


const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);

        if (!deleteProduct) {
            return res.status(404).json({ message: "Producto no encontrado para eliminar"});
        }

        res.status(200).json({ message: "Producto eliminado correctamente"});
    
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message})
    }
}

export { createProduct, getProducts, getProductById, updateProductById, deleteProductById }