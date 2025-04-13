import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://your-api-endpoint.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem("token", res.data.token);
      console.log(res.data)
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-20 shadow-md bg-white rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" autoComplete="off" required />
      <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" autoComplete="new-password" required />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Login</button>
      <p className="text-sm mt-2 text-center">Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign up</Link></p>
    </form>
  );
};

export default Login;

