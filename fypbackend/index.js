const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const dataRoutes = require("./routes/data");

const app = express();

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

const reportsRoute = require("./routes/reports");
app.use("/api/reports", reportsRoute); // Reports routes

// Models
const Profile = require("./models/Profile"); // Import your Profile model

// Route to save or update user profile
app.post("/api/profile", async (req, res) => {
  // Your existing profile route code
});

// Route to get user profile by email
app.get("/api/profile/:email", async (req, res) => {
  // Your existing profile route code
});

// Use data routes
app.use("/api/data", dataRoutes);

// Setup Socket.io with Express server
const server = http.createServer(app);
const io = socketIo(server);

// Handle incoming messages from clients
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle incoming messages
  socket.on("message", (data) => {
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
