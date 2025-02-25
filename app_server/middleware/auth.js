const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // attach user info
            req.user = decoded;
            // set authentication status in locals
            res.locals.isAuthenticated = true;
        } catch (err) {
            // on invalid token, reset user authentication
            res.locals.isAuthenticated = false;
        }
    } else {
        // no token provided
        res.locals.isAuthenticated = false;
    }

    // Move to the next middleware/route
    next();
};

module.exports = checkAuth;
