import express from "express";
import dbConnection from "./data/index.js";
const app = express();
const port = 3000;



//Routes

app.get('/', (req, res) => {
    res.send('Hello World!')
    });

//DB Connection

dbConnection.then(connection =>{
    console.log(connection);
})
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});