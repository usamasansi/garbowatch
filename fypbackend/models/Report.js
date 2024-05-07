const mongoose = require("mongoose");

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
  location: String,
  additionalInfo: String,
  image: String,
  date: Date,
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
