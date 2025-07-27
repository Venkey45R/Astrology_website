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
import GoogleSignin from './components/GoogleOAuth/GoogleSingin';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/Home';
import AuthenticateAdmin from './components/AuthenticateAdmin';
import UnauthorizedPage from './pages/UnauthorizedPages';
import AdminDashboard from './pages/AdminDashBoard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import SlotManager from './pages/SlotManager';
import AppointmentForm from './components/AppointmentForm';
import AppointmentViewer from './pages/AppointmentsViewer';
import UserManager from './pages/UserManager';
import Terms from './pages/Terms';

function App() {

  const [userData, setUserData] = useState(null) 
  return (
    <div className="App">
      <header className="App-header">
      <ToastContainer />
        <Navbar/>
        <Routes>
          <Route path="/login" element={<GoogleSignin />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/your-orders" element={<UserOrders />} />
          <Route path="/terms" element={<Terms />} />

          {/* Route for unauthorized access */}
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <AuthenticateAdmin>
                <AdminDashboard />
              </AuthenticateAdmin>
            }
            />
             <Route path='admin/appointment-viewer' element={<AuthenticateAdmin>
               <AppointmentViewer/>
              </AuthenticateAdmin>
              }/>
               <Route path='/admin/slot-management' element={<AuthenticateAdmin>
               <SlotManager/>
              </AuthenticateAdmin>
              }/>
               <Route path='/admin/user-management' element={<AuthenticateAdmin>
               <UserManager/>
              </AuthenticateAdmin>
              }/>
              
          {/* Add other routes here as your application grows */}
        </Routes>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
