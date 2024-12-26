"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RetroGrid from "@/components/ui/retro-grid";
import modelsImage from "../assets/models.png"; // Import the image directly

const LandingPage = () => {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-b from-[#16423C] to-[#6A9C89]">
      {/* Upper Part with Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12161b] to-transparent">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>
      <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex justify-center items-center"
        >
          <img
            src={modelsImage}
            alt="Models"
            className="mx-auto w-40"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute w-full text-center flex justify-center items-center"
        >
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#9caed1] to-[#8293c2] text-transparent bg-clip-text tracking-wide"
          >
            WELCOME TO FEMINAE
          </h1>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          <RetroGrid
            className="w-full h-full"
            cellSize={55}
            angle={60}
            opacity={0.8}
            lightLineColor="#131010"
            darkLineColor="#DDDDDD"
          />
        </div>
       
        {/* Interactive Buttons */}
      <div className="absolute bottom-8 left-8">
        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link to="/login">
            <button
              className="bg-gradient-to-r from-[#E57373] to-[#F06292] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8">
        {/* Signup Button */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link to="/signup">
            <button
              className="bg-gradient-to-r from-[#E57373] to-[#F06292] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              Signup
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
