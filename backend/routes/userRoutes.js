import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.route('/').get(protect, admin, getAllUsers);

router.route('/:id').delete(protect, admin, deleteUser);

export default router;
