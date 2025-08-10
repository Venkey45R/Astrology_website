import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import Button from './Button';


import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from 'react';


// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const SigninButton = () => {
  const [isHowered,setIsHowered] =useState(false)
   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token"); // Get the token from the cookie

      // if (!token) {
      //   toast.error("You are not logged in. Redirecting to sign-in.", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      //   navigate("/login"); // Redirect to sign-in page if no token
      //   return;
      // }

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
        // toast.error("Failed to load profile. Please log in again.", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        // Clear potentially invalid token and redirect
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("id");
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // Dependency array includes navigate to avoid lint warnings

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/logout`);
      // console.log(response.data.message);

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
      // toast.error("Logout failed. Please try again.", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }
  };

 

return  user ? (
  <div className='relative h-full' onMouseEnter={()=> {setIsHowered(true)} }  >
   {
    isHowered && ( 
    <div className='absolute right-0 bottom-0 translate-y-[115%] w-[180px] px-2 py-4 bg-purple-700 rounded-lg border border-purple-400 shadow-lg' onMouseLeave={()=> {
    setIsHowered(false)}}>
      <p>{user.name?.slice(0,15)+"..."}</p>
      <Button onClick={handleLogout} className={"w-full mt-2"}>
        SignOut
      </Button>
    </div>)
   }
    <button className='w-[35px] h-[35px] rounded-full border border-blue-200 bg-[var(--background)] flex justify-center items-center overflow-hidden'>
      <img src={user.photo} className='w-full h-full object-cover'/>
    </button>
  </div>) : 
  (<a href='/login'>
    <button className='w-[35px] h-[35px] rounded-full border border-blue-200 bg-[var(--background)] flex justify-center items-center'>
        <FaUserAlt className='text-blue-600' />
  </button>
  </a>)
}

export default SigninButton