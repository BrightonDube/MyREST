// middleware/isLoggedIn.js
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is logged in, proceed
    }

    // Check if the request is likely an API request (e.g., Accept: application/json header, starts with /api/)
    if (req.headers.accept && req.headers.accept.includes('application/json') || req.path.startsWith('/api')) {
        // For API requests, send 401 Unauthorized JSON response
        return res.status(401).json({ message: 'Unauthorized', isAuthenticated: false });
    } else {
        // For browser navigation (or if Accept header is not JSON), redirect to the root path '/' (login page)
        res.redirect('/');
    }
};

export default isLoggedIn;