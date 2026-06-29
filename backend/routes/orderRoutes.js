import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

// Customer: Place a new order
router.post('/', protect, createOrder);

// Customer: View their own order history
router.get('/myorders', protect, getMyOrders);

// Admin: View all orders in the system
router.get('/', protect, admin, getAllOrders);

// Admin: Update the status of a specific order
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
