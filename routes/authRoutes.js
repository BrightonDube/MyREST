import express from 'express';
import passport from './auth.js'; // Import passport configuration

const router = express.Router();

/**
 * GET /auth/google
 * @tags Authentication
 * @summary Redirects user to Google OAuth login page
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * GET /auth/google/callback
 * @tags Authentication
 * @summary Google OAuth callback route, handles authentication and redirects
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }), // Redirect on failure
  (req, res) => {
    res.redirect('/dashboard'); // Redirect to dashboard on success
  }
);

/**
 * GET /auth/logout
 * @tags Authentication
 * @summary Logs out the user
 */
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } // handles error during logout
    res.redirect('/'); // Redirect to homepage after logout
  });
});

export default router;
