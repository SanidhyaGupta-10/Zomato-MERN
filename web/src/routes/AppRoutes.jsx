import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "../pages/user/UserRegister";
import UserLogin from "../pages/user/UserLogin";
import PartnerRegister from "../pages/partner/PartnerRegister";
import PartnerLogin from "../pages/partner/PartnerLogin";
import Home from "../pages/general/Home";
import CreateFoodPartner from "../pages/food-partner/CreateFoodPartner";
import Profile from "../pages/food-partner/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFoodPartner />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
