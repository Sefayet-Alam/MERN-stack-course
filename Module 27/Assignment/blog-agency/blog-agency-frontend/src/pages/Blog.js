import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../API/api";
import "./Blog.css";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [expandedBlogId, setExpandedBlogId] = useState(null); // Track which blog is expanded

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetchBlogs();
                setBlogs(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load blogs. Please try again later.");
            }
        };

        getBlogs();
    }, []);

    const toggleExpanded = (blogId) => {
        setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className="blog">
            <h1 className="blog-title">Our Blogs</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="blog-list">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <div className="image-wrapper">
                                <img
                                    src={blog.image || "/placeholder-image.png"} // Replace missing images
                                    alt={blog.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-image.png"; // Fallback image
                                    }}
                                    className="blog-image"
                                />
                            </div>
                            <h3 className="blog-card-title">{blog.title}</h3>
                            <p className="blog-content">
                                {expandedBlogId === blog._id
                                    ? blog.content // Show full content if expanded
                                    : truncateText(blog.content, 150)}
                            </p>
                            <p className="blog-author">By: {blog.author}</p>
                            <button
                                className="read-more-button"
                                onClick={() => toggleExpanded(blog._id)}
                            >
                                {expandedBlogId === blog._id ? "Show Less" : "Read More"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-blogs">No blogs available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Blog;
