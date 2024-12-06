import express from "express";
import blogModel from "../models/blogModel.js";  // Default import

const router = express.Router();

// Create a blog
router.post("/", async (req, res) => {
    try {
        const newBlog = await blogModel.create(req.body);
        res.status(201).json({ message: "Blog created successfully", data: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
});

// Get a blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ data: blog });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving blog", error });
    }
});

// Update a blog by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
});

// Delete a blog by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
});

export default router;
