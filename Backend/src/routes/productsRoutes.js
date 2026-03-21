import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controller/productsController.js';
import { sessionVerify } from '../middleware/authSession.js';
import { verifyRole } from '../middleware/verifyRole.js';

const router = Router();

router.post('/', sessionVerify, verifyRole, createProduct);
router.get('/', sessionVerify, verifyRole, getProducts);
router.get('/edit/:id', sessionVerify, verifyRole, getProductById);
router.put('/:id', sessionVerify, verifyRole, updateProductById);
router.delete('/:id', sessionVerify, verifyRole, deleteProductById);

export default router;