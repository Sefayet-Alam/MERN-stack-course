const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate a JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('User found:', user);

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
                console.log('Manual comparison result:', isMatch);
            });

            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
