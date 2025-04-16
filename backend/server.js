const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

// ✅ Use async function to connect to DB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No callback!
    console.log("✅ Connected to MongoDB");

    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
  }
};

startServer(); // Call the async function
