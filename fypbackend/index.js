const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dataRoutes = require("./routes/data");
// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://0.0.0.0:27017/garbowatch", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const signupRoute = require("./routes/signup");
app.use("/api/signup", signupRoute); // Signup route

const loginRoute = require("./routes/login");
app.use("/api/login", loginRoute); // Login route
// Models
const Profile = require("./models/Profile"); // Import your Profile model
const reportsRoute = require("./routes/reports"); // Import reports routes
app.use("/api/reports", reportsRoute); // Reports routes
// Routes
// Route to save or update user profile
app.post("/api/profile", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      organizations,
      organizeAction,
      receiveNotifications,
    } = req.body;

    // Check if the user profile exists, if so, update it; if not, create a new one
    let userProfile = await Profile.findOne({ email });

    if (!userProfile) {
      userProfile = new Profile({
        firstName,
        lastName,
        email,
        phone,
        organizations,
        organizeAction,
        receiveNotifications,
      });
    } else {
      userProfile.firstName = firstName;
      userProfile.lastName = lastName;
      userProfile.phone = phone;
      userProfile.organizations = organizations;
      userProfile.organizeAction = organizeAction;
      userProfile.receiveNotifications = receiveNotifications;
    }

    await userProfile.save();
    res.status(200).json({
      username: userProfile.username,
      message: "Profile saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get user profile by email
app.get("/api/profile/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const userProfile = await Profile.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Use data routes
app.use("/api/data", dataRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running  on port ${PORT}");
});
