import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, phone, address } = req.body;
  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;

  const updated = await user.save();

  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    phone: updated.phone,
    address: updated.address,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'customer' }).select('-password');
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (user.role === 'admin') {
    return res.status(400).json({ message: 'Cannot delete admin account' });
  }
  await user.deleteOne();
  res.json({ message: 'User removed' });
};
