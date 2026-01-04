import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName: fullName,
      email: email,
      password: password
    }, {
      withCredentials: true
    });
    console.log(response);

    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Register as a user
        </p>

        <form onClick={handleSubmit} className="space-y-4">
          <input
            id='fullName'
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            id='email'
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            id='password'
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
