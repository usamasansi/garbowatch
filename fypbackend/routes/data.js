const express = require("express");
const router = express.Router();
const Data = require("../models/data");

// POST route to submit data
router.post("/submit", async (req, res) => {
  try {
    const { image, date, location, classificationResult } = req.body;

    // Check if the image and location already exist in the database
    const existingData = await Data.findOne({ image, location });

    if (existingData) {
      return res.status(400).json({ message: "Data already exists" });
    }
    if (!image || !location || !date || !classificationResult) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    // Create a new data document
    const newData = new Data({
      image,
      date,
      location,
      classificationResult,
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
