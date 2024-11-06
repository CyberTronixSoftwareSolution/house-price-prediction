// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Chart from "chart.js/auto";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLogin from "./pages/user/UserLogin";
import { useEffect, useState } from "react";
import UserSignUp from "./pages/user/UserSignUp";
import UserProfile from "./pages/user/UserProfile";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import UserHome from "./pages/user/UserHome";
import LandingPage from "./pages/user/LandingPage";
import { useAuth } from "./shared/context/AuthContext";

function App() {
  const [userType, setUserType] = useState(1); // Example: "user", "admin", "guest"

  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      setUserType(Number(authUser.role));
    } else {
      setUserType("");
    }
  }, [authUser]);

  return (
    <>
      <Routes>
        {userType === 1 ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/userProfile" element={<UserProfile />} />
          </Route>
        ) : userType === 2 ? (
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signIn" element={<UserLogin />} />
            <Route path="/signUp" element={<UserSignUp />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
