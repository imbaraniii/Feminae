import React from "react";
import { useNavigate } from "react-router-dom";
import "./child.css";

const Child = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/therapy");
  };

  return (
    <div className="child-page">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <section id="videos">
        <h1 className="section-headings">VIDEOS</h1>
        <div className="collection">
          {[
            "https://www.youtube.com/embed/_NTfTd4HCRo?si=qeEoiQqz7HKqiZ1T",
            "https://www.youtube.com/embed/zs21cKJs87E",
            "https://www.youtube.com/embed/gB12TV38QBo",
          ].map((src, index) => (
            <div key={index} className="video">
              <iframe
                width="100%"
                height="315"
                src={src}
                title={`Child Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Child;
