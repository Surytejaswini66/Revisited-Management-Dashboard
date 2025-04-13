import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Replace this with your actual backend URL
const API_BASE = "http://localhost:5000/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure you're sending data to the correct signup route in your backend
      await axios.post(`${API_BASE}/auth/signup`, { email, password });
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-20 shadow-md bg-white rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Signup</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full p-2 border rounded" 
        autoComplete="off" 
        required 
      />
      <input 
        type="password" 
        placeholder="Enter your password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="w-full p-2 border rounded"  
        autoComplete="new-password" 
        required 
      />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Signup</button>
      <p className="text-sm mt-2 text-center">Have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>
    </form>
  );
};

export default Signup;
