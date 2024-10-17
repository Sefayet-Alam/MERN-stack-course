const mongoose = require('mongoose');

const config = {
    JWT_KEY: '124979821517',
    DATABASE_URI: 'mongodb+srv://sefayetalam14:p200114@cluster0.1ghb5.mongodb.net/Student_Registration',
    PORT: 3000
};

const connectDB = async () => {
    try {
        await mongoose.connect(config.DATABASE_URI); // Removed deprecated options
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process if MongoDB connection fails
    }
};

module.exports = { ...config, connectDB };
