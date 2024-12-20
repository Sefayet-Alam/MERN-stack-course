import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      {/* Contact Details Section */}
      <div className="contact-details">
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

      {/* Contact Form Section */}
      <div className="contact-form-container">
        <h2>Send us a message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
