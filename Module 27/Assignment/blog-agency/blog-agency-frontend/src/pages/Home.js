import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../API/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data.slice(0, 6)); // Fetch only the first 6 blogs
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Blog Agency</h1>
          <p className="hero-subtitle">
            Your one-stop solution for blogs, services, and dynamic teams!
          </p>
          <button className="cta-button" onClick={() => navigate("/blogs")}>
            Explore Blogs
          </button>
        </div>
      </div>

      {/* Blog Section */}
      <div className="home-blogs">
        <h2 className="section-title">Latest Blogs</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="blogs-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-snippet">{blog.content.substring(0, 100)}...</p>
                {/* <button className="read-more-button">Read More</button> */}
              </div>
            ))
          ) : (
            <p className="no-blogs">No blogs available at the moment.</p>
          )}
        </div>
      </div>

      {/* Custom Section */}
      <div className="custom-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="custom-text">
          We are dedicated to providing the best blog management services,
          along with dynamic team support and reliable services. Explore our
          team, and the latest blogs to keep you informed. Join us today!
        </p>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2024 Blog Agency. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
