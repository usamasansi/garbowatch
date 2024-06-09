const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    console.log(user)
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
      
    }

    return res.status(200).json({ message: 'Login successful', data:user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;