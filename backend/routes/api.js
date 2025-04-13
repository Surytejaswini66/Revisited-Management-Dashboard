const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Category = require('../models/Category');
const User = require('../models/User');
const { protect } = require('../middleware/auth'); // Import the authentication middleware
const upload = require('../middleware/upload'); // Import multer configuration

const router = express.Router();

// Admin signup
router.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new category (protected route, with file upload)
// Create a new category (protected route, with file upload)
// Create a new category (protected route, with file upload)
router.post('/categories', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, itemCount } = req.body;

    // Log incoming data for debugging
    console.log('Request Body:', req.body);  // Logs name and itemCount
    console.log('Uploaded File:', req.file); // Logs the file upload details

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const category = new Category({ name, itemCount, imageUrl });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error('❌ Error creating category:', err); // More detailed error logging
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Edit an existing category (protected route)
router.put('/categories/:id', protect, async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    category.itemCount = itemCount || category.itemCount;
    category.imageUrl = imageUrl || category.imageUrl;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'Invalid category data' });
  }
});

module.exports = router;
