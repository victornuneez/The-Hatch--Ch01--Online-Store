import { Router } from 'express';
import { shopCart, confirmOrder } from '../controllers/shopCarController.js';

const router = Router();

router.post('/shop-car', shopCart);
router.post('/confirm-order', confirmOrder);

export default router;