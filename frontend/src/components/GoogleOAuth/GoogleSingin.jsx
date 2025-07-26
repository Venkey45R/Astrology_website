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
        // console.log("Login successful:", res.data);
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
        // console.log(name)
        setUserName(name); // Set user name for display
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
        navigate("/home"); // Navigate to the new home page
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
      // console.log(response.data.message); // Expected: "Logged out successfully"

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
      navigate("/login"); // Redirect to the sign-in page
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
   <div className="w-full min-h-[80vh] flex items-center justify-center">
  <div className="max-w-[600px] flex flex-col justify-center items-center border mx-auto px-4 py-8 sm:px-8 sm:py-16 rounded-lg bg-purple-700 shadow-lg">
    {isLoggedIn ? (
      <>
        <h2 className="text-2xl text-white">You are Signed In!</h2>
       
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-8 py-2 mt-4 text-lg text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Go to Home Page.
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-8 py-2 mt-3 text-lg text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <h2 className="text-2xl text-white">Sign In</h2>
        <p className="mb-4 text-white">
          Signing in is required to book an appointment
        </p>
        <div className="mt-4">
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
              });
            }}
            auto_select={true}
            theme="filled_black"
            size="large"
            text="signin_with"
          />
        </div>
      </>
    )}
  </div>
</div>
  );
};

export default GoogleSignin;
