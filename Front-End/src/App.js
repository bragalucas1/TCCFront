import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/ActivityCard/Navbar/Navbar";
import ActivityPage from "./pages/Activity/Actitivity";

const TeacherView = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  const showNavbar = !["/register", "/"].includes(location.pathname);
  const isTeacher = user?.perfil === 1;
  console.log("user", user);
  console.log(isTeacher);

  const ContentWrapper = ({ component: Component }) => {
    if (!user) return <Component />;
    return isTeacher ? <TeacherView /> : <Component />;
  };

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/home" 
          element={<ContentWrapper component={HomePage} />} 
        />
        <Route 
          path="/activity/:id" 
          element={<ContentWrapper component={ActivityPage} />} 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;