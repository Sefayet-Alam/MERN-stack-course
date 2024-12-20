import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Me</h1>
      <div className="contact-content">
        {/* Left Side - Message Form */}
        <div className="contact-form-container">
          <h2>Send me a message</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>

        {/* Right Side - Profile and Contact Cards */}
        <div className="contact-info">
          <div className="profile-section">
            <img
              src="https://cdn.pixabay.com/photo/2023/11/21/13/29/ai-generated-8403411_1280.jpg"
              alt="Profile"
              className="profile-pic"
            />
            <h3 className="profile-name">Sefayet Alam</h3>
          </div>
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-text">Email: sefayetalam14@gmail.com</div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">🔗</div>
              <div className="contact-text">
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/sefayet-alam-8333b4242/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sefayet Alam
                </a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">🐙</div>
              <div className="contact-text">
                GitHub:{" "}
                <a
                  href="https://github.com/Sefayet-Alam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sefayet Alam
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
