import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = document.getElementById("businessName").value;
    const contactName = document.getElementById("contactName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;

    const formData = {
      name: businessName,
      contactName: contactName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      address: address,
    };

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", formData, {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      navigate('/create-food'); // redirect to partner create food page after registration
    })
    .catch(error => {
      console.log("There was an error!", error);
    });
     
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-4">
          Partner Registration
        </h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            id="businessName"
            type="text"
            placeholder="Business Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            id="contactName"
            type="text"
            placeholder="Contact Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            id="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <textarea
            id="address"
            rows="2"
            placeholder="Address"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-medium"
          >
            Create Partner Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
