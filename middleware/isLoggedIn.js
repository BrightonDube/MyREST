// middleware/isLoggedIn.js
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google'); // Redirect to Google OAuth login if not authenticated
}

export default isLoggedIn;