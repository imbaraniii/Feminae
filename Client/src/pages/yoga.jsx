import React from "react";
import { useNavigate } from "react-router-dom";
import "./yoga.css";

const Yoga = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/therapy");
  };

  return (
    <div className="yoga-page">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <section className="videos" id="videos">
        <div data-aos="fade-up" data-aos-duration="800" className="flip-card">
          <div className="inner">
            <div className="col-lg-6 col-md-12">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/s2NQhpFGIOg"
                title="YouTube video player 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="inner">
            <div className="col-lg-6 col-md-12">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/g_tea8ZNk5A"
                title="YouTube video player 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-duration="800" className="flip-card">
          <div className="inner">
            <div className="col-lg-6 col-md-12">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/c8hjhRqIwHE"
                title="YouTube video player 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="inner">
            <div className="col-lg-6 col-md-12">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/brjAjq4zEIE"
                title="YouTube video player 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-duration="800" className="flip-card">
          <div className="inner">
            <div className="col-lg-6 col-md-12">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/0XBcrjkkwQo"
                title="YouTube video player 5"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="inner">
            <div className="col-lg-6 col-md-12">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/7Vqv5SmSKHY"
                title="YouTube video player 6"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Yoga;
