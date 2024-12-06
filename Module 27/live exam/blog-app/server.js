import express from "express";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js"; // Adjust if needed

const app = express();
app.use(express.json());  // Body parser middleware for JSON

// Use the blog routes
app.use("/blogs", blogRoutes);

// MongoDB connection
mongoose
    .connect('mongodb+srv://sefayetalam14:p200114@cluster0.1ghb5.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
