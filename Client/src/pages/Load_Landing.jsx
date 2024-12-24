import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import Ripple from "../components/ui/ripple";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 5173);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <img src={logo} alt="Feminae Logo" className="w-36 h-auto mb-8" />
      <Ripple />
    </div>
  );
};

export default SplashScreen;
