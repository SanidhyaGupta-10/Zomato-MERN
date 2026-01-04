import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email: email,
      password: password
    }, {
      withCredentials: true
    });
    console.log(response);

    navigate('/');  // redirect to home page after login
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Login to your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
