// src/pages/UnauthorizedPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4 font-inter">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-200">
        <h1 className="text-5xl font-extrabold text-red-700 mb-6 tracking-tight">
          Access Denied
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/home-page")}
          className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-102 flex items-center justify-center space-x-2"
        >
          <span>Go to Home Page</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
