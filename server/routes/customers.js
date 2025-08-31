const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Simple route to get customer profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      customer: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;