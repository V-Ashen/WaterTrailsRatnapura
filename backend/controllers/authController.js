const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT securely
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_ratnapura_123', {
        expiresIn: '30d',
    });
};

const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const user = await User.create({ username, password });

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        console.error("🔥 authController Register Error:", error);
        res.status(500).json({ message: "Server error", error: error.message, stack: Boolean(error) ? String(error) : "Unknown" });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("🔥 authController Error:", error);
        res.status(500).json({ message: "Server error", error: error.message, stack: error.stack });
    }
};

module.exports = { registerAdmin, loginAdmin };
