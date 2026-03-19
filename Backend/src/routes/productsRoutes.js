import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controller/productsController.js';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;