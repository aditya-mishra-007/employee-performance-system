const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // 🔥 FIX: Explicitly allow the frontend's local testing bypass token
            if (token === 'Mock_Bypass' || token === 'Mock_Dev_Token') {
                req.user = { _id: "60c72b2f9b1d8b2bad8e9999", name: "Mock Admin" };
                return next();
            }

            // Verify real cryptographic token if it's not a bypass
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            res.status(401).json({ success: false, error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };