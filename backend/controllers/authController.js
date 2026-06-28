import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, phone, address });

  const token = signToken(user._id, user.role);

  res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken(user._id, user.role);

  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
