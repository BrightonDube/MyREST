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
    res.redirect('/'); // Redirect to dashboard on success
  }
);
/**
 * GET /auth/facebook
 * @tags Authentication
 * @summary Redirects user to Facebook OAuth login page
 */
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

/**
 * GET /auth/facebook/callback
 * @tags Authentication
 * @summary Facebook OAuth callback route, handles authentication and redirects
 */
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }), // Redirect on failure
  (req, res) => {
    res.redirect('/dashboard'); // Redirect to dashboard on success
    console.log('Facebook OAuth URL:', oauthUrl);
  }
);

/**
 * GET /auth/github
 * @tags Authentication
 * @summary Redirects user to Github OAuth login page
 */
router.get('/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

/**
 * GET /auth/github/callback
 * @tags Authentication
 * @summary Github OAuth callback route, handles authentication and redirects
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), // Redirect on failure
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
