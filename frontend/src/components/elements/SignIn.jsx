import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseConfig/firebaseConfig';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import axios from 'axios';

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      phoneNumber: "",
      role: "user"
    };

    const res = await axios.post(
      "http://localhost:8080/api/users",
      userData,
      { withCredentials: true } // ✅ Required for cookie
    );
    function getCookie(name) {
      const cookies = document.cookie.split("; ");
      console.log(cookies)
      for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
      }
      return null;
    }

// Usage
    const userString = getCookie("userData");
    const userObj = userString ? JSON.parse(userString) : null;
    console.log(userObj)
    const savedUser = res.data;
    // console.log(savedUser)
    setUser(savedUser);
    navigate("/booking");
  } catch (error) {
    console.error("Google Sign-In or Backend Error:", error);
    alert("Sign-in failed. Please try again.");
  }
};


  return (
    <div className='w-full min-h-[80%] flex items-center justify-center'>
      <div className='max-w-[600px] flex flex-col justify-center items-center border mx-auto px-4 py-8 sm:px-8 sm:py-16 rounded-lg bg-purple-700 shadow-lg'>
        <h2 className='text-2xl text-white'>Sign In</h2>
        <p className='mb-4 text-white'>Signing in is required to book an appointment</p>
        <button
          className='flex items-center gap-2 px-8 py-1 mt-4 text-lg text-black bg-yellow-500 border rounded-lg'
          onClick={handleGoogleSignIn}
        >
          <FaGoogle /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
