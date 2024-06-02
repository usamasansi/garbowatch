const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Import your Profile model

// Route to save or update user profile
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, organizations, organizeAction, receiveNotifications } = req.body;

    // Check if the user profile exists, if so, update it; if not, create a new one
    let userProfile = await Profile.findOne({ email });

    if (!userProfile) {
      userProfile = new Profile({
        firstName,
        lastName,
        email,
        phone,
        organizations,
        organizeAction,
        receiveNotifications,
      });
    } else {
      userProfile.firstName = firstName;
      userProfile.lastName = lastName;
      userProfile.phone = phone;
      userProfile.organizations = organizations;
      userProfile.organizeAction = organizeAction;
      userProfile.receiveNotifications = receiveNotifications;
    }

    await userProfile.save();
    res.status(200).json({ username: userProfile.username, message: 'Profile saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get user profile by email
router.get('/:email', async (req, res) => {
  try {
     console.log(req.params.email)
     const jsonObject = JSON.parse(req.params.email)
    const userProfile = await Profile.findOne({ email:jsonObject.email });
    console.log(userProfile);

    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
   return res.status(200).json({data:userProfile});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
