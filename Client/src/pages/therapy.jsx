import React from "react";
import { useNavigate } from "react-router-dom";
import "./therapy.css";

const Therapy = () => {
  const navigate = useNavigate();

  return (
    <div className="therapy-container">
      <button className="back-button" onClick={() => navigate("/homepage")}>
        Back
      </button>
      <h1 className="therapy-title">CHOOSE YOUR THERAPY</h1>
      <div className="therapy-options">
        <button className="therapy-button" onClick={() => navigate("/audio")}>
          AUDIO THERAPY
        </button>
        <button className="therapy-button" onClick={() => navigate("/yoga")}>
          YOGA THERAPY
        </button>
        <button className="therapy-button" onClick={() => navigate("/book")}>
          BOOK THERAPY
        </button>
        <button className="therapy-button" onClick={() => navigate("/laugh")}>
          LAUGHING THERAPY
        </button>
        <button className="therapy-button" onClick={() => navigate("/child")}>
          CHILD THERAPY
        </button>
      </div>
    </div>
  );
};

export default Therapy;
