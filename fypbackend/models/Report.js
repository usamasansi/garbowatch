const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  fitsinabag: Boolean,
  fitsinawheelbarrow: Boolean,
  truckneeded: Boolean,
  househould: Boolean,
  construction: Boolean,
  plastic: Boolean,
  glass: Boolean,
  paper: Boolean,
  accessibilebyacar: Boolean,
  additionalInfo: String,
  additionalInfo1:String,
  latitude: Number,  // Add latitude
  longitude: Number, // Add longitude
  report:String,
});

module.exports = mongoose.model('Report', reportSchema);
