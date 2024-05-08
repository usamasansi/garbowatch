const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    unique: true, // Ensures that no two documents can have the same image
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
    unique: true, // Ensures that no two documents can have the same location
  },
});

module.exports = mongoose.model("Data", dataSchema);
