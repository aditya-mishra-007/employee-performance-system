const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new user profile
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Please fill in all entry fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'An account with this email already exists' });
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            token: generateToken(user._id)
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate credentials and return token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide both email and password' });
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                success: true,
                token: generateToken(user._id)
            });
        }

        return res.status(401).json({ success: false, error: 'Invalid email or password entry' });
    } catch (error) {
        next(error);
    }
};