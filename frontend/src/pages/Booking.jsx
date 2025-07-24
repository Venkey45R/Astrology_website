import React, { useEffect, useState } from 'react'
import AppointmentForm from '../components/AppointmentForm'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";
import axios from 'axios';
// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const Booking = () => {
  const [user,setUser] =useState()
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate()
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
  }, [navigate]);
  return (
    <div className='w-full'>
        <div className='w-full max-w-7xl mx-auto flex flex-col p'>
            <h1 className='text-2xl text-center mt-8'>
                Book Your Slot Now.
            </h1>
            <p className='text-sm text-center mt-4'>
                Schedule your appointment with Kalaga Prasad Garu <br/> Available 7 days a week, 8AM to 8PM
            </p>
            <AppointmentForm useInfo={user}/>
        </div>
    </div>
  )
}

export default Booking