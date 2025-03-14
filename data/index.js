import mongoose from "mongoose";
import { config } from "dotenv";

config();

async function connectDB() {
    try {
  const connection = await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Connected to MongoDB!"); 
  return connection;
} catch (error) {
  console.error("MongoDB connection error:", error);  
  process.exit(1); // Exit if the connection fails
}}

let dbConnection;
async function initializeDB() {
    try {
        dbConnection = await connectDB(); 
    } catch (err){
        console.error(err);
        process.exit(1);
    }
}
initializeDB();
export default dbConnection;