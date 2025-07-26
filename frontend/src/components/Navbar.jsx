import React, { useEffect, useState } from 'react'
import Button from './elements/Button'
import SigninButton from './elements/SigninButton'
import { Link } from 'react-router'
import Cookies from "js-cookie";
import { Axios } from 'axios';
Axios.defaults.withCredentials = true;
const Navbar = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);
   useEffect(() => {
      const token = Cookies.get("token");
      if (!token){
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    }, [])
  
  return (
    <header className="w-full bg-black/30 backdrop-blur border-b border-yellow-400/20 sticky top-0 z-40">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="text-3xl">🌟</div>
        <a href='/home'>
            <div>
          <h1 className="text-xl font-bold text-yellow-300">Kalaga Prasad Astrology</h1>
          <p className="text-sm text-blue-200">Scientific Astrology Expert</p>
        </div>
        </a>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href='/home'>
        <button className="text-white hover:text-yellow-300">Home</button>

        </a>
        <a href="#services">
          <button className="text-white hover:text-yellow-300">Services</button>
        </a>
        {
          loggedIn && (<a href="/your-orders">
          <button className="text-white hover:text-yellow-300">Your Orders</button>
        </a>)
        }
        <a href="/booking">
          <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-yellow-300" >
            Book Now
        </button>
        </a>
        <SigninButton />
      </nav>
    </div>
  </header>
  )
}

export default Navbar