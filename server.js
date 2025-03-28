import express from 'express';
import bodyParser from 'body-parser';

import dbConnection from './data/index.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const swaggerDocument = require('./swagger_output.json');

import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
config();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dbConnection;
app.use('/', postRoutes);
app.use('/', commentRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
