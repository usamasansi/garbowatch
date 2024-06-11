const express = require('express');
const Report = require('../models/Report'); // Import the Report model
const router = express.Router();

// POST request to create a new report
router.post('/', async (req, res) => {
  try {
    const {
      fitsinabag,
      fitsinawheelbarrow,
      truckneeded,
      househould,
      construction,
      plastic,
      glass,
      paper,
      accessibilebyacar,
      additionalInfo,
      latitude,
      longitude,
      report
    } = req.body;

    const newReport = new Report({
      fitsinabag,
      fitsinawheelbarrow,
      truckneeded,
      househould,
      construction,
      plastic,
      glass,
      paper,
      accessibilebyacar,
      additionalInfo,
      latitude,
      longitude,
      report,
    });

    await newReport.save();
    res.status(201).json({ message: 'Report saved successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'An error occurred while creating the report' });
  }
});

// GET request to fetch all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'An error occurred while fetching the reports' });
  }
});

// DELETE request to delete a report by ID
router.delete('/:id', async (req, res) => {
  try {
    const reportId = req.params.id;
    await Report.findByIdAndDelete(reportId);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'An error occurred while deleting the report' });
  }
});

module.exports = router;
