const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/garbowatch', {
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
app.use("/api/login", loginRoute); // Login route

const reportsRoute = require("./routes/reports");
app.use("/api/reports", reportsRoute); // Reports routes

const profileRoute = require("./routes/profile");
app.use("/api/profile", profileRoute); // Profile routes

// Use data routes
const dataRoutes = require("./routes/data");
app.use("/api/data", dataRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
