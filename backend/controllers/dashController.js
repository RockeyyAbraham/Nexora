import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueResult, recentOrders] =
      await Promise.all([
        User.countDocuments({ role: 'customer' }),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([
          { $match: { status: 'Delivered' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]),
        Order.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('user', 'name'),
      ]);

    const totalRevenue = revenueResult[0]?.total ?? 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard statistics.' });
  }
};
