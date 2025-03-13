import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-800">
      <div className="bg-blue-950 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Welcome to Home</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;