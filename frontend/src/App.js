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

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
