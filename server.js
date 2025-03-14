import express from "express";
import dbConnection from "./data/index.js";
import postRoutes from "./routes/index.js";
import { config } from 'dotenv'; // ES Modules
config();
const app = express();
const port = process.env.PORT || 3000;
app.use('/posts', postRoutes);

dbConnection;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});