// index.js

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/mern_assessment", {})
  .then((result) => {
    console.log("Datbase is connected..");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
