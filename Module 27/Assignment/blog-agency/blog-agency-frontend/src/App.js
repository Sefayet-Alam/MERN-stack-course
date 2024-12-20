import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"; // For securing routes
import Dashboard from "./pages/Dashboard"; // Dashboard page
import Team from "./pages/Team";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check user login state from localStorage on app load
    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user); // Convert to boolean
    }, []);

    const handleLogin = () => {
        // Save user login status in localStorage
        localStorage.setItem("user", true);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Remove user from localStorage
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blogs" element={<Blog />} />
                    <Route path="/services" element={<Service />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/teams" element={<Team />} />
                    
                    {/* Login & Register Routes */}
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Home /> // Redirect to Home if already logged in
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isLoggedIn ? (
                                <Home /> // Redirect to Home if already logged in
                            ) : (
                                <Register onRegister={handleLogin} />
                            )
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
