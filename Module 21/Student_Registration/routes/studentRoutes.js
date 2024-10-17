const express = require('express');
const path = require('path'); // Ensure path is imported for file management
const fs = require('fs'); // Ensure fs is imported for file management
const { registerStudent, loginStudent, readProfile, updateProfile, uploadStudentFile } = require('../controllers/studentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload'); // File upload configuration
const Student = require('../models/Student'); // Ensure the path is correct
const router = express.Router();

// Register a new student
router.post('/register', registerStudent);

// Login a student
router.post('/login', loginStudent);

// Get student profile
router.get('/profile', auth, readProfile);

// Update student profile
router.put('/profile', auth, updateProfile);

// Upload a profile picture
router.post('/upload/profile-pic', auth, upload.single('profilePic'), async (req, res) => {
    try {
        const student = await Student.findById(req.student.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        // Store the path of the uploaded profile picture
        student.profilePic = req.file.path; 
        await student.save();

        res.status(200).json({ msg: 'Profile picture uploaded successfully', profilePic: student.profilePic });
    } catch (err) {
        console.error('Error uploading profile picture:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Upload any type of file
router.post('/upload/file', auth, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    try {
        const student = await Student.findById(req.student.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        // Here, you can store the uploaded file's information (e.g., filename) in the student's record
        student.uploadedFile = req.file.path; // Example field to store uploaded file path
        await student.save();

        res.status(200).json({ msg: 'File uploaded successfully', uploadedFile: student.uploadedFile });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Read uploaded file
// File read route
router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    console.log('Requested file:', filename);
    console.log('Resolved file path:', filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('File read error:', err);
            res.status(404).json({ msg: 'File not found' });
        }
    });
});

// Delete uploaded file
router.delete('/file/:filename', auth, (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ msg: 'Failed to delete file' });
        }
        res.status(200).json({ msg: 'File deleted successfully' });
    });
});

module.exports = router;
