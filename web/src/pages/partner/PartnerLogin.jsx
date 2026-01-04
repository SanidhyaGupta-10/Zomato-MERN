import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const formData = {
      email: email,
      password: password,
    };

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", formData, {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      navigate('/create-food'); // redirect to partner dashboard after login
    })
    .catch(error => {
      console.log("There was an error!", error);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Partner Login
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Access your dashboard
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black"
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartnerLogin;
