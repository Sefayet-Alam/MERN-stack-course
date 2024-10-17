const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Make sure to adjust the path as needed

const auth = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received:', token);  // Log the token received
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, config.JWT_KEY);  // Use JWT_KEY from config
        console.log('Decoded token:', decoded);  // Log the decoded token
        req.student = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);  // Log the error
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
