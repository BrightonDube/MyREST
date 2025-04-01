import express from 'express';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import dbConnection from './data/index.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { createRequire } from 'module';
import { config } from 'dotenv';
import passport from './routes/auth.js'; // Import passport config
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger_output.json');
const MongoDBStoreSession = MongoDBStore(session);

config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const store = new MongoDBStoreSession({
  uri: process.env.CONNECTION_STRING, 
  collection: 'sessions' 
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

dbConnection; // Database connection

// Session middleware
app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*', 
    credentials: true 
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true,
    store: store, 
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // Example: 24 hours
    }
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
