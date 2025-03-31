import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import dbConnection from './data/index.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import { config } from 'dotenv';
import passport from './routes/auth.js'; // Import passport config
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger_output.json');

config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dbConnection; // Database connection

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret-key', 
        resave: false,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes); // Mount authentication routes at /auth
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve frontend (index.html) - public route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});