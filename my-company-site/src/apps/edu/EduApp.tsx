// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import EduHome from "./pages/Home";

export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EduHome />} />
        </Route>
      </Routes>
  );
}
