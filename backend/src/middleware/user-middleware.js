const jwt = require('jsonwebtoken');
require('dotenv').config();  // Load environment variables

const authenticateUser = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Access denied. No token provided." 
            });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid token. Please log in again." 
        });
    }
};

module.exports = authenticateUser;
