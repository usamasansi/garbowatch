const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  size: String,
  type: String,
  accessibility: String,
  location: String,
  additionalInfo: String,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
