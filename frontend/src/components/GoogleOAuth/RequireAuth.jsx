// src/components/auth/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token");

  if (!token) {
    // ✅ THIS IS CRUCIAL: passes `state={{ from: location }}`
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
