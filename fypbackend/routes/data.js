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

// GET route to fetch all data
router.get("/", async (req, res) => {
  try {
    const allData = await Data.find();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE route to delete data by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the data exists
    const existingData = await Data.findById(id);
    if (!existingData) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Delete the data from MongoDB
    await existingData.deleteOne();

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/last30days", async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    console.log('Current Date:', currentDate);

    // Calculate the date 30 days ago
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    pastDate.setHours(0, 0, 0, 0);
    console.log('Past Date:', pastDate);

    // Find all data entries where the date is greater than or equal to 30 days ago
    const recentData = await Data.find({ date: { $gte: pastDate } }).exec();
    console.log('Recent Data:', recentData);

    // Send the data as JSON response
    res.status(200).json(recentData);
  } catch (error) {
    console.error("Error fetching data from the last 30 days:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/most-issues-area", async (req, res) => {
  try {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    pastDate.setHours(0, 0, 0, 0);

    // Group by location and count occurrences
    const areaData = await Data.aggregate([
      { $match: { date: { $gte: pastDate } } },
      { $group: { _id: "$location", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 } // Get the area with the most reports
    ]);

    if (areaData.length > 0) {
      res.status(200).json(areaData[0]);
    } else {
      res.status(404).json({ message: "No reports found in the last 30 days" });
    }
  } catch (error) {
    console.error("Error fetching area with most issues:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
