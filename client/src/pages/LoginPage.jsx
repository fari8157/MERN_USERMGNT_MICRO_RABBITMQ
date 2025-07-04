import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess,setUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const res = await loginUser(formData);
    console.log("API Response:", res);
    console.log("res.data.token:", res.token);
console.log("res.data.user:", res.user);


    dispatch(loginSuccess(res.token));
    dispatch(setUser(res.user));
    navigate('/');
  } catch (err) {
    console.error("Login error:", err); // 💥 print full error
    console.error("Login error full:", err);
console.log("error.response:", err.response);
console.log("error.message:", err.message);

    setError(err.response?.data?.message || 'Login failed');
  }
};



  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;