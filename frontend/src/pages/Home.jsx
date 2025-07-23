// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token"); // Get the token from the cookie

      if (!token) {
        toast.error("You are not logged in. Redirecting to sign-in.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/"); // Redirect to sign-in page if no token
        return;
      }

      try {
        // Send the token in the Authorization header as a Bearer token
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch user profile:",
          error.response?.data || error.message
        );
        toast.error("Failed to load profile. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Clear potentially invalid token and redirect
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("id");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // Dependency array includes navigate to avoid lint warnings

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/logout`);
      console.log(response.data.message);

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("id");

      toast.info("Signed out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/"); // Redirect to the sign-in page
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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
        Loading user data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-2xl font-semibold font-inter">
        User data not found. Please sign in.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center transform transition-all duration-500 hover:scale-[1.01] border border-gray-200">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Welcome, {user.name}!
        </h1>
        {user.photo && (
          <img
            src={user.photo}
            alt="User Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-500 shadow-lg object-cover"
          />
        )}
        <div className="space-y-3 mb-8">
          <p className="text-xl text-gray-700">
            Role:{" "}
            <span className="font-semibold text-indigo-700">{user.role}</span>
          </p>
          <p className="text-lg text-gray-600">
            Email: <span className="font-medium">{user.email}</span>
          </p>
          {user.phoneNumber && (
            <p className="text-lg text-gray-600">
              Phone: <span className="font-medium">{user.phoneNumber}</span>
            </p>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-6 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Logout</span>
          </button>
          {/* Add more elegant buttons/sections for astrology features here */}
          <button
            onClick={() =>
              toast.info("Future astrology features will be here!")
            }
            className="w-full py-3 px-6 bg-indigo-500 text-white font-bold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Explore Astrology</span>
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Your celestial journey continues.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
