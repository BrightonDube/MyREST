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
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs/'); // Redirect to homepage on success
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
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs'); // Fixed: Redirect to homepage on success - Consistent with Google
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
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Fixed: Redirect to homepage on success - Consistent with Google
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
    }
    res.redirect('/'); // Redirect to homepage after logout
  });
});

export default router;
