// Profile.js

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  organizations: String,
  organizeAction: Boolean,
  receiveNotifications: Boolean,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;