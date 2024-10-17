const express = require('express');
const { registerStudent, loginStudent, readProfile, updateProfile } = require('../controllers/studentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/profile', auth, readProfile); 
router.put('/profile', auth, updateProfile); 
router.post('/upload', auth, upload.single('profilePic'), async (req, res) => {
    try {
        const student = await Student.findById(req.student.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        student.profilePic = req.file.path; 
        await student.save();

        res.status(200).json({ msg: 'File uploaded successfully', profilePic: student.profilePic });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// File read and delete routes
router.get('/file/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(filePath);
});

router.delete('/file/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ msg: 'Failed to delete file' });
        res.status(200).json({ msg: 'File deleted successfully' });
    });
});

module.exports = router;
