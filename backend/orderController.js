// backend/controllers/orderController.js

const Order = require('../models/Order');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Protected (Customer)
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order.' });
    }

    // Validate each item has required fields
    for (const item of items) {
      if (!item.product || !item.quantity || !item.price) {
        return res.status(400).json({
          message: 'Each item must include product, quantity, and price.',
        });
      }
      if (item.quantity < 1) {
        return res
          .status(400)
          .json({ message: 'Item quantity must be at least 1.' });
      }
      if (item.price < 0) {
        return res
          .status(400)
          .json({ message: 'Item price cannot be negative.' });
      }
    }

    // Calculate total amount server-side to prevent client tampering
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      status: 'Pending',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ message: 'Server error while creating order.' });
  }
};

// @desc    Get logged-in customer's orders
// @route   GET /api/orders/myorders
// @access  Protected (Customer)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'title imageUrl category')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('getMyOrders error:', error);
    res.status(500).json({ message: 'Server error while fetching your orders.' });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Protected + Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('items.product', 'title imageUrl category')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('getAllOrders error:', error);
    res.status(500).json({ message: 'Server error while fetching all orders.' });
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Protected + Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}.`,
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('updateOrderStatus error:', error);
    res
      .status(500)
      .json({ message: 'Server error while updating order status.' });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
