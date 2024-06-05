const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Endpoint to handle image upload and classification
router.post('/classify', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  // Run the classification script
  exec(`python classify.py ${imagePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    res.json({ result: stdout.trim() });
  });
});

module.exports = router;
