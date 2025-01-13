import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation(); // Hook to get the current route
  const isActive = (path) => location.pathname === path; // Check if the route matches the current page

  const handleEraseAllData = () => {
    // Logic to erase all data
    alert("All data erased successfully!");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-lg mb-6">Your personal information is listed below.</p>

      {/* Profile Details Section */}
      <div className="p-6 bg-black text-white rounded-lg shadow-md w-full max-w-4xl border border-gray-600 flex flex-col md:flex-row">
        {/* Profile Information */}
        <div className="w-full p-4">
          <h2 className="text-xl font-semibold mb-2">Your Details:</h2>
          <ul className="list-disc list-inside">
            <li className="text-gray-300">
              <strong>Name:</strong> Priya Sharma
            </li>
            <li className="text-gray-300">
              <strong>Email:</strong> priya@example.com
            </li>
            <li className="text-gray-300">
              <strong>Phone:</strong> +91-9876543210
            </li>
            <li className="text-gray-300">
              <strong>Blood Group:</strong> B+
            </li>
            <li className="text-gray-300">
              <strong>Dietary Preferences:</strong> Vegetarian
            </li>
          </ul>
        </div>
      </div>

      {/* Erase All Data Button */}
      <Link to="/login">
      <button
        onClick={handleEraseAllData}
        className="mt-6 px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md border border-gray-600 hover:bg-gray-800 transition"
      >
        Erase All Data
      </button>
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black py-3 shadow-md flex justify-around border-t border-gray-700 mt-6">
        
        <Link
          to="/chatpage"
          className={`text-center transition ${
            isActive("/chatpage")
              ? "text-white relative"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div>🤖</div>
          <span className="text-xs">AI Chat</span>
          {isActive("/chatpage") && (
            <span
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white bg-opacity-50 rounded-full"
            ></span>
          )}
        </Link>
        <Link
          to="/calendar"
          className={`text-center transition ${
            isActive("/calendar")
              ? "text-white relative"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div>📅</div>
          <span className="text-xs">Calendar</span>
          {isActive("/calendar") && (
            <span
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white bg-opacity-50 rounded-full"
            ></span>
          )}
        </Link>
        <Link
          to="/profile"
          className={`text-center transition ${
            isActive("/profile")
              ? "text-white relative"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div>👤</div>
          <span className="text-xs">Profile</span>
          {isActive("/profile") && (
            <span
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white bg-opacity-50 rounded-full"
            ></span>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default ProfilePage;