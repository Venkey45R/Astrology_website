// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StaticLandingPage from "./StaticLandingPage";

// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const token = Cookies.get("token"); // Get the token from the cookie

  //     if (!token) {
  //       toast.error("You are not logged in. Redirecting to sign-in.", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       navigate("/"); // Redirect to sign-in page if no token
  //       return;
  //     }

  //     try {
  //       // Send the token in the Authorization header as a Bearer token
  //       const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error(
  //         "Failed to fetch user profile:",
  //         error.response?.data || error.message
  //       );
  //       toast.error("Failed to load profile. Please log in again.", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       // Clear potentially invalid token and redirect
  //       Cookies.remove("token");
  //       Cookies.remove("role");
  //       Cookies.remove("id");
  //       navigate("/");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [navigate]); // Dependency array includes navigate to avoid lint warnings

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/api/auth/logout`);
  //     console.log(response.data.message);

  //     Cookies.remove("token");
  //     Cookies.remove("role");
  //     Cookies.remove("id");

  //     toast.info("Signed out successfully!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     navigate("/"); // Redirect to the sign-in page
  //   } catch (error) {
  //     console.error("Logout failed:", error.response?.data || error.message);
  //     toast.error("Logout failed. Please try again.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center  text-2xl font-semibold font-inter">
  //       <svg
  //         className="animate-spin h-8 w-8 mr-3 text-indigo-500"
  //         viewBox="0 0 24 24"
  //       >
  //         <circle
  //           className="opacity-25"
  //           cx="12"
  //           cy="12"
  //           r="10"
  //           stroke="currentColor"
  //           strokeWidth="4"
  //         ></circle>
  //         <path
  //           className="opacity-75"
  //           fill="currentColor"
  //           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //         ></path>
  //       </svg>
  //       Loading user data...
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-2xl font-semibold font-inter">
  //       User data not found. Please sign in.
  //     </div>
  //   );
  // }

  return (
    <div className="w-full min-h-screen">
        <StaticLandingPage/>
    </div>
  );
};

export default HomePage;
