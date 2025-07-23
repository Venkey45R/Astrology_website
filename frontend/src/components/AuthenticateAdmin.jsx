// src/components/AuthenticateAdmin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios"; // Import axios to potentially fetch user details if needed

// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const AuthenticateAdmin = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = Cookies.get("token");

      if (!token) {
        // No token, not logged in, redirect to sign-in
        toast.error("Please sign in to access this page.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/");
        return;
      }

      try {
        // Decode the token to get the role
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        // Optionally, re-verify token with backend for stronger security,
        // though decoding client-side is faster for initial check.
        // For a robust system, the backend's /me endpoint would also enforce auth.
        // const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        //     headers: { Authorization: `Bearer ${token}` }
        // });
        // const backendUserRole = response.data.role;

        if (role === "admin") {
          // Compare with the role from the decoded token
          setUserRole("admin");
        } else {
          // Not an admin, redirect to unauthorized page
          toast.warn("You do not have administrative access.", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        toast.error("Authentication failed. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        Cookies.remove("token"); // Clear invalid token
        Cookies.remove("role");
        Cookies.remove("id");
        navigate("/"); // Redirect to sign-in on token error
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-2xl font-semibold font-inter">
        <svg
          className="animate-spin h-8 w-8 mr-3 text-indigo-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Verifying access...
      </div>
    );
  }

  // If userRole is 'admin', render the children (the protected content)
  if (userRole === "admin") {
    return <>{children}</>;
  }

  // If not admin and not loading, it means they were redirected.
  // This component won't render anything if redirected, as navigate handles it.
  return null;
};

export default AuthenticateAdmin;
