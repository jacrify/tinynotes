const User = require('../models/User');
const { registerSchema, loginSchema } = require('../utils/validation');

// Register a new user
const register = async (req, res) => {
  // Validate request body
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: value.email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Create new user
  const user = await User.create({
    email: value.email,
    password: value.password
  });

  // Generate token
  const token = user.generateToken();

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      email: user.email
    }
  });
};

// Login user
const login = async (req, res) => {
  // Validate request body
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Find user by email
  const user = await User.findOne({ email: value.email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check password
  const isPasswordValid = await user.comparePassword(value.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate token
  const token = user.generateToken();

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email
    }
  });
};

// Get current user
const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({
    user: {
      id: user._id,
      email: user.email
    }
  });
};

module.exports = {
  register,
  login,
  getCurrentUser
};
