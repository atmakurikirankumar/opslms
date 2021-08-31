const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const leavesRoutes = require("./routes/leavesRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

// Connect DB
connectDB();

const app = express();

app.use(cors({ origin: "*" }));

// Init Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leaves", leavesRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../lms-frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../lms-frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || "development";

app.listen(PORT, () => console.log(`Server running in ${ENVIRONMENT} mode on port ${PORT}`));
