import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/ActivityCard/Navbar/Navbar";
import TeacherHomepage from "./pages/TeacherHome/TeacherHome";
import TeacherStudents from "./pages/TeacherStudents/TeacherStudents";
import TeacherActivities from "./pages/TeacherActivity/TeacherActivity";

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  const showNavbar = !["/register", "/"].includes(location.pathname);

  const ContentWrapper = ({
    studentComponent: StudentComponent,
    teacherComponent: TeacherComponent,
  }) => {
    if (!user) return <StudentComponent />;
    return user?.perfil === 1 ? <TeacherComponent /> : <StudentComponent />;
  };

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ContentWrapper
              studentComponent={HomePage}
              teacherComponent={TeacherHomepage}
            />
          }
        />
        {user?.perfil === 1 && (
          <>
            <Route path="/atividades" element={<TeacherActivities />} />
            <Route path="/alunos" element={<TeacherStudents />} />
          </>
        )}
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
