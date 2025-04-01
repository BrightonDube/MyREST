import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
          email: profile.emails?.[0]?.value // Use optional chaining and check if emails array and value exist
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
