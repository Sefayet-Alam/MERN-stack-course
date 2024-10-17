// Correct path to the Student model
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); 

// Register student
exports.registerStudent = async (req, res) => {
    const { name, firstName, fathersName, mothersName, email, password } = req.body;
    try {
        // Validate email
        if (!validateEmail(email)) return res.status(400).json({ msg: 'Invalid email' });

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

        await newStudent.save();
        res.status(201).json({ msg: 'Student registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login student
exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = generateToken(student._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ msg: 'Logged in', token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Read student profile
exports.readProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password'); // Exclude password
        if (!student) return res.status(404).json({ msg: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
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
