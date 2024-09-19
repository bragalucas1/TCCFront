// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Importa o BrowserRouter
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/ActivityCard/Navbar/Navbar";
import ActivityPage from "./pages/Activity/Actitivity";

function AppRoutes() {
  const location = useLocation();
  const showNavbar = !["/register", "/"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/activity/:id" element={<ActivityPage />} /> {/* Rota para a página de atividade */}
      </Routes>
    </>
  );
}

function App() {
  return (
      <Router>
        <AppRoutes />
      </Router>
  );
}

export default App;
