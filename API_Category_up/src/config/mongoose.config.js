const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    console.error("Stack trace:", err.stack);
  }
};

connectToDatabase();
