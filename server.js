import express from 'express';
const app = express();
import dbConnection from './data/index.js';
import postRoutes from './routes/posts.js';
import bodyParser from 'body-parser';
import { config } from 'dotenv'; // ES Modules
import path from 'path';
import { fileURLToPath } from 'url';

config();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConnection;
app.use('/posts', postRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'restfulapi', 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
