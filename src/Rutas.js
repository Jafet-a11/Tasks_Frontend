import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import DashboardUser from "./Pages/Dashboard/DashboardUser";
import DashboardGroups from "./Pages/Dashboard/DashboardGroups";
import LoginPage from "./Pages/LoginPage/LoginPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import RegistrationPage from "./Pages/Registrationpage/Registrationpage";
import DashboardGroup from "./Pages/Dashboard/DashboardGroup";
const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Pages/LandingPage/LandingPage" />} />
        <Route path="/Pages/Dashboard/DashboardPage" element={<DashboardPage />} />
        <Route path="/Pages/Dashboard/DashboardUser" element={<DashboardUser />} />
        <Route path="/Pages/Dashboard/DashboardGroups" element={<DashboardGroups />} />
        <Route path="/Pages/LoginPage/LoginPage" element={<LoginPage />} />
        <Route path="/Pages/LandingPage/LandingPage" element={<LandingPage />} />
        <Route path="/Pages/Registrationpage/Registrationpage" element={<RegistrationPage />} />
        <Route path="/Pages/Dashboard/DashboardGroup" element={<DashboardGroup />} />
      </Routes>
    </Router>
  );
};

export default Rutas;