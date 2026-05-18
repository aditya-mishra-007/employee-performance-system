const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check for Bearer token structure in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token string from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify signed token token payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch target user context from payload and append to the request body
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
        }
    }

    // Fallback if no token was sent at all
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized, no token provided' }); // Matches missing token test case
    }
};

module.exports = { protect };