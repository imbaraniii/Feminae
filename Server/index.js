const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://feminae123:feminae123@cluster0.qayni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
