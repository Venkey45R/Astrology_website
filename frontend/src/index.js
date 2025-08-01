import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
console.log("Google Client ID:", CLIENT_ID); // Log the client ID for debugging
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
