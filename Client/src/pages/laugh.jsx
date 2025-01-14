import React from "react";
import { useNavigate } from "react-router-dom";
import "./laugh.css";

const Laugh = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/therapy");
  };

  return (
    <div className="laugh-page">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <section id="standups">
        <h1 data-aos="zoom-in-up" className="section-headings">
          STANDUPS
        </h1>
        <div className="collection">
          {[
            "https://www.youtube.com/embed/Tqsz6fjvhZM",
            "https://www.youtube.com/embed/Y2Oj9gllHno?start=16",
            "https://www.youtube.com/embed/XDlyS4N__3o?start=22",
            "https://www.youtube.com/embed/z12bz7adLKI",
            "https://www.youtube.com/embed/pjSxOnCkHIA?si=0KNI6JYCbbjujeFY",
            "https://www.youtube.com/embed/J38ZBIvLank",
            "https://www.youtube.com/embed/dtaJzUbQS7E",
            "https://www.youtube.com/embed/8PtsKRBgLrA",
            "https://www.youtube.com/embed/cHLM9L_5gj0",
            "https://www.youtube.com/embed/injU8xUHoyU",
            "https://www.youtube.com/embed/KKnhgkmV7k8",
            "https://www.youtube.com/embed/_9x9zagDbks",
            "https://www.youtube.com/embed/L9pA6sZZjeY",
            "https://www.youtube.com/embed/MLOp3iQFlXY",
            "https://www.youtube.com/embed/AhacYw9dkyE",
            "https://www.youtube.com/embed/qkxuFKqJXWY",
          ].map((src, index) => (
            <div key={index} data-aos="flip-down" className="video">
              <iframe
                width="100%"
                height="330"
                src={src}
                title={`Standup Video ${index + 1}`}
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

export default Laugh;
