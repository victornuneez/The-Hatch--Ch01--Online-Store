import { Router } from 'express';
import { getOrders, updateOrderStatus } from '../controller/ordersController.js';
import { sessionVerify} from '../middleware/authSession.js';
import { verifyRole } from '../middleware/verifyRole.js';

const router = Router();

router.get('/', sessionVerify, verifyRole, getOrders);
router.put('/:id/status', sessionVerify, verifyRole,updateOrderStatus);

export default router;