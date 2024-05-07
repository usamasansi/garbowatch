const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  image: String,
  date: Date,
  location: String,
});

module.exports = mongoose.model("Data", dataSchema);
