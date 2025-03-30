import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import dbConnection from './data/index.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import { config } from 'dotenv';
import passport from './public/oauth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);

const swaggerDocument = require('./swagger_output.json');
config(); // ✅ Load environment variables first

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure DB Connection Runs
dbConnection;

// Express session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);

// ✅ Initialize Passport AFTER session
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// ✅ Add Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirect user after successful login
  }
);

// Routes
app.use('/', postRoutes);
app.use('/', commentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Fix Static File Serving
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
