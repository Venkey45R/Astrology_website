// Example: src/components/AuthButtons.js or src/pages/LoginPage.js
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Still imported, but not used for token/role/id storage in this version
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from  'jwt-decode'; // Import jwt-decode

// IMPORTANT: Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

// Define your backend API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function AuthButtons() {
    const navigate = useNavigate(); // Hook for navigation

    /**
     * Placeholder for a temporary alert function.
     * In a real application, replace this with a proper UI notification system.
     */
    const showTempAlert = (message, type) => {
        console.log(`Alert (${type}): ${message}`);
        // Example: You might use a state variable to display a message on the UI
    };

    /**
     * Handles the Google Login success callback from the Google Identity Services client library.
     * This function receives the credential (which contains email, name, etc.)
     * and sends it to your backend.
     * @param {Object} credentialResponse - The response object from Google's sign-in.
     * @param {string} credentialResponse.credential - The JWT credential from Google.
     */
    const handleGoogleSuccess = async (credentialResponse) => {
        // Decode the Google JWT to get user information using jwt-decode
        const decodedCredential = jwtDecode(credentialResponse.credential);

        const email = decodedCredential.email;
        const name = decodedCredential.name;
        const photo = decodedCredential.picture; // Google profile picture URL

        try {
            // Make a POST request to your backend's /api/auth/google endpoint
            const res = await axios.post(`${API_BASE_URL}/api/auth/google`, {
                email,
                name,
                photo // Send photo to backend
            });

            if (res.data.message === "success") {
                // No client-side storage of token, role, or id as requested
                // If you need to access user data on the frontend, you'll need
                // to store it in state, context, or a non-cookie storage method.

                // Navigate directly to /home after successful login
                navigate('/home');
            } else {
                showTempAlert("Something went wrong during sign-in", "error");
                navigate('/signup');
            }
        } catch (error) {
            console.error('Google sign-in failed:', error.response ? error.response.data : error.message);
            showTempAlert("Failed to sign in with Google. Please try again.", "error");
            navigate('/signup');
        }
    };

    /**
     * Handles the user logout.
     * Makes an API call to the backend's logout endpoint and clears local storage/cookies.
     */
    const handleLogout = async () => {
        try {
            // Make a GET request to the backend's logout endpoint.
            const response = await axios.get(`${API_BASE_URL}/api/auth/logout`);

            console.log(response.data.message); // Expected: "Logged out successfully"

            // No client-side storage to clear as requested

            // After successful logout, redirect the user to the login page or homepage.
            window.location.href = '/login'; // Or '/' or whatever your login route is

        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
            showTempAlert('Failed to log out. Please try again.', 'error');
        }
    };

    /**
     * Example of a protected route call (e.g., to fetch user profile)
     * This demonstrates how to send the JWT token with the request.
     * NOTE: With no client-side token storage, this function will need
     * a different mechanism to obtain the token if it's not in an HTTP-only cookie.
     * As per previous discussions, your backend is sending the token in the response body,
     * so if you remove client-side storage, you'll need to re-evaluate how protected
     * routes are authenticated on the frontend.
     */
    const fetchUserProfile = async () => {
        try {
            // If you're not storing the token in Cookies or localStorage,
            // you'll need to get it from somewhere else, or rely on HTTP-only cookies
            // (which would require a backend change to set them).
            // For now, this function will likely fail if no token is stored client-side.
            const token = "YOUR_TOKEN_HERE_IF_MANUALLY_MANAGED_OR_FROM_CONTEXT"; // Placeholder

            if (!token || token === "YOUR_TOKEN_HERE_IF_MANUALLY_MANAGED_OR_FROM_CONTEXT") {
                showTempAlert('You are not logged in or token not available client-side.', 'error');
                return;
            }

            // Send the token in the Authorization header as a Bearer token
            const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('User Profile:', response.data);
            showTempAlert(`Welcome, ${response.data.name}! Your role is: ${response.data.role}`, 'success');
        } catch (error) {
            console.error('Failed to fetch user profile:', error.response ? error.response.data : error.message);
            showTempAlert('You are not logged in or your session has expired.', 'error');
        }
    };


    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Authentication Actions</h1>
            {/* Google Sign-In Button integration - This is where your colleague would use
                the Google Identity Services client library to get the credential.
                For example, using the @react-google-oauth/google package:
                <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log('Login Failed')}
                    />
                </GoogleOAuthProvider>
            */}
            <button
                // This button would typically trigger the Google Identity Services client library
                // which then calls handleGoogleSuccess with the credential.
                // For demonstration, you might simulate it or use the actual GoogleLogin component.
                onClick={() => showTempAlert("Integrate Google Identity Services here to get credentialResponse", "info")}
                style={{
                    padding: '10px 20px',
                    margin: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4285F4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Simulate Google Sign-in (Click to see logic)
            </button>
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
                *Note: This setup does not store the JWT client-side.
                <br />
                Consider how you will manage authentication state for protected routes.
            </p>
        </div>
    );
}

export default AuthButtons;
