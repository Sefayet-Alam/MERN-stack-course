const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String } // URL to the profile picture
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
