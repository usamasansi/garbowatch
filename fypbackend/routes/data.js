const express = require("express");
const router = express.Router();
const Data = require("../models/data");

// POST route to submit data
router.post("/submit", async (req, res) => {
  try {
    const { image, date, location } = req.body;

    // Create a new data document
    const newData = new Data({
      image,
      date,
      location,
    });

    // Save the data to MongoDB
    await newData.save();

    res.status(201).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
