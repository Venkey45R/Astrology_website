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

  
  return (
    <div className='w-full'>
        <div className='w-full max-w-7xl mx-auto flex flex-col p'>
            <h1 className='text-2xl text-center mt-8'>
                Book Your Slot Now.
            </h1>
            <p className='text-sm text-center mt-4'>
                Schedule your appointment with Kalaga Prasad Garu <br/> Available 7 days a week, 8AM to 8PM
            </p>
            <AppointmentForm/>
        </div>
    </div>
  )
}

export default Booking
