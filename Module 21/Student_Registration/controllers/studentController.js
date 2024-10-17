// Correct path to the Student model
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); 
const jwt = require('jsonwebtoken'); // Make sure to import jsonwebtoken
const config = require('../config/config');  // Import JWT_KEY from your config.js

// Generate JWT Token
const generateToken = (studentId) => {
    return jwt.sign({ id: studentId }, config.JWT_KEY, { expiresIn: '1h' });  // Generates a token valid for 1 hour
};
// Register student
exports.registerStudent = async (req, res) => {
    const { name, firstName, fathersName, mothersName, email, password } = req.body;
    try {
        // Validate email
        // if (!validateEmail(email)) return res.status(400).json({ msg: 'Invalid email' });

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) return res.status(400).json({ msg: 'Student already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            name,
            firstName,
            fathersName,
            mothersName,
            email,
            password: hashedPassword
        });

        // Save the new student
        await newStudent.save();

        // Generate JWT token
        const token = jwt.sign({ id: newStudent._id }, config.JWT_KEY, { expiresIn: '1h' });

        // Send token and success message
        res.status(201).json({ msg: 'Student registered successfully', token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login student
exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide both email and password' });
        }

        // Find student by email
        const student = await Student.findOne({ email });
        if (!student) {
            console.error(`Login failed: No student found with email ${email}`);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            console.error(`Login failed: Incorrect password for email ${email}`);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(student._id);
        res.cookie('token', token, { httpOnly: true }); 

        res.status(200).json({ msg: 'Logged in successfully', token });
    } catch (err) {
        console.error('Server error during login:', err.message); 
        res.status(500).json({ msg: 'Server error' });
    }
};

// Read student profile
exports.readProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password');
        if (!student) return res.status(404).json({ msg: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        console.error('Profile read error:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update student profile
exports.updateProfile = async (req, res) => {
    const { name, firstName, fathersName, mothersName, profilePic } = req.body;
    try {
        const student = await Student.findByIdAndUpdate(req.student.id, {
            name,
            firstName,
            fathersName,
            mothersName,
            profilePic
        }, { new: true, runValidators: true }).select('-password'); // Exclude password

        if (!student) return res.status(404).json({ msg: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
