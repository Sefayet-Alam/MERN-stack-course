import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Sefayet Alam. All rights reserved.</p>
        <p>
          Created by <strong>Sefayet Alam</strong>
        </p>
        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/sefayet-alam-8333b4242/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="icon" /> LinkedIn
          </a>
          <a
            href="https://github.com/Sefayet-Alam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="icon" /> GitHub
          </a>
          <a href="mailto:sefayetalam14@gmail.com">
            <FaEnvelope className="icon" /> Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
