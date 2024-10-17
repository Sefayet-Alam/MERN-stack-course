const express = require('express');
const { connectDB, PORT } = require('./config/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Connect Database
connectDB();

// API routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
