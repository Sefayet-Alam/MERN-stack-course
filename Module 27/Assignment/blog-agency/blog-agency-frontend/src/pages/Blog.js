import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../API/api";
import "./Blog.css";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");

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

    return (
        <div className="blog">
            <h1 className="blog-title">Our Blogs</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="blog-list">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <img
                                src={blog.image || "https://via.placeholder.com/150"}
                                alt={blog.title}
                                className="blog-image"
                            />
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
                            <p className="blog-author">By: {blog.author}</p>
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
