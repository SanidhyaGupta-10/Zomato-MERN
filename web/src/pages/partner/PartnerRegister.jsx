const PartnerRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-4">
          Partner Registration
        </h1>

        <form className="space-y-3">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="text"
            placeholder="Contact Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />

          <textarea
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
