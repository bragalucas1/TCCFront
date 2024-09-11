// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa o BrowserRouter
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';

const App = () => {
  return (
    <Router> {/* Envolva as rotas com o Router */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
