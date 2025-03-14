import express from "express";
const app = express();
import dbConnection from "./data/index.js";
import postRoutes from "./routes/posts.js";
import  bodyParser  from 'body-parser';
import { config } from 'dotenv'; // ES Modules

config();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConnection;
app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send('Welcome Home!')
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});