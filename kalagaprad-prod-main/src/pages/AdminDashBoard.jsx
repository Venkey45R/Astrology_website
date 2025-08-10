// src/pages/AdminDashboard.jsx
import React from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  // Example of how you might use toast on this page
  React.useEffect(() => {
    toast.success("Welcome to the Admin Dashboard!", {
      position: "bottom-left",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-violet-800 p-4 font-inter">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-center border border-gray-200">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Manage users, content, and settings for AstroLink.
        </p>
        <div className="flex flex-col gap-3">
          <a href="/admin/user-management">
            <button
            onClick={() => toast.info("User management features here!")}
            className="w-full py-3 px-6 bg-violet-500 text-white font-bold rounded-lg shadow-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102"
          >
            Manage Users
          </button>
          </a>
          <a href="/admin/appointment-viewer">
            <button
            onClick={() => toast.info("User management features here!")}
            className="w-full py-3 px-6 bg-violet-500 text-white font-bold rounded-lg shadow-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102"
          >
            View Appointments
          </button>
          </a>
          <a href="/admin/slot-management">
            <button
            onClick={() => toast.info("Content management features here!")}
            className="w-full py-3 px-6 bg-violet-500 text-white font-bold rounded-lg shadow-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102"
          >
            Manage Time Slots
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
