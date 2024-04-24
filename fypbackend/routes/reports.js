const express = require('express');
const Report = require('../models/Report'); // Import the Report model

const router = express.Router();

// POST request to create a new report
router.post('/', async (req, res) => {
  try {
    const { size, type, accessibility, location, additionalInfo } = req.body;
    const newReport = new Report({
      size,
      type,
      accessibility,
      location,
      additionalInfo,
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'An error occurred while creating the report' });
  }
});

module.exports = router;
