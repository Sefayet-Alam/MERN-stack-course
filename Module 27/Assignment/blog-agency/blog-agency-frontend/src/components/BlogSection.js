import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogSection.css';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blogs');
                setBlogs(response.data.slice(0, 3)); // Display only the latest 3 blogs
            } catch (err) {
                setError('Failed to load blogs. Please try again later.');
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blog-section">
            <h2>Latest Blogs</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="blog-preview-list">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="blog-preview">
                            <h3>{blog.title}</h3>
                            <p>{blog.content.substring(0, 100)}...</p>
                            <Link to="/blogs" className="read-more">
                                Read More
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No blogs available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default BlogSection;
