import logo from './logo.svg';
import { jwtDecode } from "jwt-decode";
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import GoogleSingin from './components/GoogleOAuth/GoogleSingin';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

function App() {

  const [userData, setUserData] = useState(null) 
  return (
    <div className="App">
      <header className="App-header">
        <Routes>

        <Route path='/' element={<GoogleSingin/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
