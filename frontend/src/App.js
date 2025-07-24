<<<<<<< HEAD
// src/App.jsx
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GoogleSignin from "./components/GoogleOAuth/GoogleSingin"; // Corrected path
import HomePage from "./pages/Home"; // Import the HomePage component
import AdminDashboard from "./pages/AdminDashBoard"; // Assuming you'll create this page
import AuthenticateAdmin from "./components/AuthenticateAdmin"; // Import the new AuthenticateAdmin component
import UnauthorizedPage from "./pages/UnauthorizedPages"; // Assuming you'll create this page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
=======
import logo from './logo.svg';
import { jwtDecode } from "jwt-decode";
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import GoogleSingin from './components/GoogleOAuth/GoogleSingin';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Booking from './pages/Booking';
import UserOrders from './pages/UserOrders';
import BookingSuccess from './pages/BookingSuccess';
import Home from './pages/Home';
>>>>>>> 8c5c73b (new routes')

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<GoogleSignin />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />{" "}
        {/* Route for unauthorized access */}
        {/* Protected Admin Route */}
        <Route
          path="/admin-dashboard"
          element={
            <AuthenticateAdmin>
              <AdminDashboard />
            </AuthenticateAdmin>
          }
        />
        {/* Add other routes here as your application grows */}
      </Routes>
=======
      <header className="App-header">
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Booking' element={<Booking/>}/>
        <Route path='/BookingSuccess' element={<BookingSuccess/>}/>
        <Route path='/UserOrders' element={<UserOrders/>}/>
        <Route path='/admin/Tools' element={<UserOrders/>}/>
        
        </Routes>
      </header>
>>>>>>> 8c5c73b (new routes')
    </div>
  );
}

export default App;
