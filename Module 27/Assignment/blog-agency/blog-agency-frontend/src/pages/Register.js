import React, { useState } from "react";
import { register } from "../API/api";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setSuccess("Registration successful! Please log in.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
