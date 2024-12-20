import { FaBlog } from "react-icons/fa"; // Import an icon
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <FaBlog size={24} color="#ff7f50" /> {/* Icon added here */}
                <Link to="/">Sefayet's Blogs</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/blogs">Blogs</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/teams">Team</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                {!isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <button
                                className="logout-button"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent page reload
                                    handleLogout();
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
