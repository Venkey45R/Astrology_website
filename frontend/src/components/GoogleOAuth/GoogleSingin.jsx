// src/components/googleOAuth/GoogleSignin.jsx
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { toast } from "react-toastify"; // Import toast

axios.defaults.withCredentials = true;
const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const GoogleSignin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check login status on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        // Optionally decode token to get user name for display
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || decodedToken.email); // Use name if available, else email
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token from cookie:", error);
        Cookies.remove("token"); // Clear invalid token
        Cookies.remove("role");
        Cookies.remove("id");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { email, name, picture: photo } = decoded;

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        email,
        name,
        photo,
      });

      if (res.data.message === "success") {
        console.log("Login successful:", res.data);
        // Store token, role, and id in cookies
        Cookies.set("token", res.data.token, {
          expires: 7, // 7 days expiration
          secure: process.env.NODE_ENV === "production", // Use secure in production
          sameSite: "Lax",
        });
        Cookies.set("role", res.data.role, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        Cookies.set("id", res.data.id, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });

        setUserName(name || email); // Set user name for display
        setIsLoggedIn(true); // Update login state

        toast.success("Sign-in successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/home-page"); // Navigate to the new home page
      } else {
        toast.error("Sign-in failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Google sign-in failed", err.response?.data || err.message);
      toast.error("Sign-in failed. Please try again.", {
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

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/logout`);
      console.log(response.data.message); // Expected: "Logged out successfully"

      // Clear cookies on logout
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("id");

      setIsLoggedIn(false); // Update login state
      setUserName(""); // Clear user name

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 font-inter">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center transform transition-all duration-500 hover:scale-[1.01] border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          AstroLink
        </h2>

        {isLoggedIn ? (
          <div className="mt-8">
            <p className="text-xl text-gray-700 mb-6">
              You are already signed in as{" "}
              <span className="font-semibold text-indigo-700">{userName}</span>.
            </p>
            <button
              onClick={() => navigate("/home-page")}
              className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 flex items-center justify-center space-x-2 mb-4"
            >
              <span>Go to Home Page</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
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
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error("Google login failed. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
                auto_select={true}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>
            <p className="mt-6 text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleSignin;
