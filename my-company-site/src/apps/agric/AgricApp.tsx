// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
//import EduHome from "./pages/Home";
import AgricHome from "./pages/Home";
import FarmSetupManagement from "./pages/Services/FarmSetupManagement"
import AgricInvestmentPlans from "./pages/others/AgricInvest";
import AboutLand from "./pages/others/AboutLand";

export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AgricHome />} />
          <Route path="/farm-setup" element={<FarmSetupManagement />} />
          <Route path="/invest" element={<AgricInvestmentPlans />} />
          <Route path="/promo-details" element={<AboutLand />} />
        </Route>
      </Routes>
  );
}
