// src/components/GoogleSignin.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const GoogleSignin = () => {
    const navigate = useNavigate();

    const showTempAlert = (message, type) => {
        console.log(`Alert (${type}): ${message}`);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const { email, name, picture: photo } = decoded;

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
                email,
                name,
                photo
            });

            if (res.data.message === "success") {
                console.log(res.data)
                // navigate('/home');
            } else {
                showTempAlert("Something went wrong during sign-in", "error");
                // navigate('/signup');
            }
        } catch (err) {
            console.error("Google sign-in failed", err.response?.data || err.message);
            showTempAlert("Failed to sign in with Google. Please try again.", "error");
            navigate('/signup');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/auth/logout`);
            console.log(response.data.message); // Expected: "Logged out successfully"
            // window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            showTempAlert('Failed to log out. Please try again.', 'error');
        }
    };

    const fetchUserProfile = async () => {
        // This will only work if the backend sets a secure HTTP-only cookie and validates it
        try {
            const response = await axios.get(`${API_BASE_URL}/api/auth/me`);
            console.log('User Profile:', response.data);
            showTempAlert(`Welcome, ${response.data.name}! Your role is: ${response.data.role}`, 'success');
        } catch (error) {
            console.error('Failed to fetch user profile:', error.response?.data || error.message);
            showTempAlert('You are not logged in or your session has expired.', 'error');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Sign in with Google</h2>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                    showTempAlert('Google login failed.', 'error');
                }}
                auto_select={true}
            />

            <hr style={{ margin: '30px 0' }} />

            <button
                onClick={handleLogout}
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Logout
            </button>

            <button
                onClick={fetchUserProfile}
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Fetch My Profile (Protected)
            </button>

            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                *Note: JWT is not stored on the client; backend should handle session via HTTP-only cookies.
            </p>
        </div>
    );
};

export default GoogleSignin;
