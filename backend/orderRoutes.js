// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Customer: Place a new order
router.post('/', protect, createOrder);

// Customer: View their own order history
// NOTE: /myorders must be defined BEFORE /:id routes to avoid Express
// interpreting "myorders" as a dynamic param.
router.get('/myorders', protect, getMyOrders);

// Admin: View all orders in the system
router.get('/', protect, admin, getAllOrders);

// Admin: Update the status of a specific order
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
