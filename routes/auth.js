import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with googleId
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log('User already exists');
          return done(null, existingUser); // Return existing user
        }

        // If user doesn't exist, create a new user
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails?.[0]?.value 
        });

        const savedUser = await newUser.save();
        console.log(`User saved: ${savedUser}`);
        return done(null, savedUser); // Return the newly saved user
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null); // Pass error to done callback
      }
    }
  )
);
// --- Facebook Strategy ---
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID, 
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET, 
      callbackURL: process.env.FACEBOOK_CALLBACK_URL, 
      profileFields: ['id', 'displayName', 'emails'], 
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with facebookId (you might want to add a facebookId field to your User model)
        const existingUser = await User.findOne({ facebookId: profile.id });

        if (existingUser) {
          console.log('Facebook User already exists');
          return done(null, existingUser);
        }

        // If user doesn't exist, create a new user
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id, // Store Facebook ID
          email: profile.emails?.[0]?.value,
        });

        const savedUser = await newUser.save();
        console.log(`Facebook User saved: ${savedUser}`);
        return done(null, savedUser);
      } catch (error) {
        console.error('Error during Facebook authentication:', error);
        return done(error, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET, 
      callbackURL: process.env.GITHUB_CALLBACK_URL, 
      passReqToCallback: true,
      scope: ['user:email'], 
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id });

        if (existingUser) {
          console.log('GitHub User already exists');
          return done(null, existingUser);
        }

        // If user doesn't exist, create a new user
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id, // Store GitHub ID
          email: profile.emails?.[0]?.value,
        });

        const savedUser = await newUser.save();
        console.log(`GitHub User saved: ${savedUser}`);
        return done(null, savedUser);
      } catch (error) {
        console.error('Error during GitHub authentication:', error);
        return done(error, null);
      }
    }
  )
);

// Serialize user for session handling
passport.serializeUser((user, done) => {
  done(null, user.id); // Use user.id to serialize user - best practice
});

// Deserialize user for session handling
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Return the user object
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error, null); // Handle error during deserialization
  }
});

export default passport;
