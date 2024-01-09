import { error } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;
const connectDB = async () => {
  // conn.connection.db.databaseName

  try {
    mongoose.set("strictQuery", false);
    // console.log("URI ", URI);
    const conn = URI && (await mongoose.connect(URI));
    console.log(`Database connected: ${conn && conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
