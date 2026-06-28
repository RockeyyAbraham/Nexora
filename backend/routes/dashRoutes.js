import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, admin, getDashboardStats);

export default router;
