import express from 'express';
import bodyParser from 'body-parser';

import dbConnection from './data/index.js';
import postRoutes from './routes/posts.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

// Create a require function for the current module's context
const require = createRequire(import.meta.url);

// Now you can use 'require' as if you were in a CommonJS module
const swaggerDocument = require('./swagger_output.json')

import { config } from 'dotenv'; // ES Modules
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
app.use('/posts', postRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
