import mongoose from "mongoose";
import { config } from "../config/app.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
};

export default connectDatabase;
