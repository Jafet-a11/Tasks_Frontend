import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import DashboardUser from "./Pages/Dashboard/DashboardUser";
import DashboardGroups from "./Pages/Dashboard/DashboardGroups";
import LoginPage from "./Pages/LoginPage/LoginPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import RegistrationPage from "./Pages/Registrationpage/Registrationpage";
import DashboardGroup from "./Pages/Dashboard/DashboardGroup";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/LoginPage" />} />
      <Route path="/DashboardPage" element={<DashboardPage />} />
      <Route path="/DashboardUser" element={<DashboardUser />} />
      <Route path="/DashboardGroups" element={<DashboardGroups />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/Registrationpage" element={<RegistrationPage />} />
      <Route path="/DashboardGroup" element={<DashboardGroup />} />
    </Routes>
  );
};

export default Rutas;
