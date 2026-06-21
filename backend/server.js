require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const chatsRoutes = require("./routes/chats");
const resumeRoutes = require("./routes/resume");

const app = express();

// Database Connect
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/chats", chatsRoutes);

app.use("/api/resume", resumeRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Sigma GPT Backend Running");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});