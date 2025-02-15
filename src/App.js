import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import DashboardUser from "./Pages/Dashboard/DashboardUser";
import DashboardHelp from "./Pages/Dashboard/DashboardHelp";
import LoginPage from "./Pages/LoginPage/LoginPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import RegistrationPage from "./Pages/Registrationpage/Registrationpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Pages/LandingPage/LandingPage" />} />
        <Route path="/Pages/Dashboard/DashboardPage" element={<DashboardPage />} />
        <Route path="/Pages/Dashboard/DashboardUser" element={<DashboardUser />} />
        <Route path="/Pages/Dashboard/DashboardHelp" element={<DashboardHelp />} />
        <Route path="/Pages/LoginPage/LoginPage" element={<LoginPage />} />
        <Route path="/Pages/LandingPage/LandingPage" element={<LandingPage />} />
        <Route path="/Pages/Registrationpage/Registrationpage" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
