import React from "react";
import { useNavigate } from "react-router-dom";
import "./audio.css";

const Audio = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/therapy"); // Ensure the /therapy route is defined in your routes
  };

  return (
    <div>
      {/* Header Section */}
      <header className="audio-header">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <div className="filter"></div>
        <div className="center">
          <h1 id="title" data-aos="fade-up" data-aos-duration="800">
            Welcome to Our <br />
            <span className="heading-span">Audio Therapy</span>
          </h1>
          <h3 id="subtitle" data-aos="fade-up" data-aos-duration="800">
            Listen to Music, Motivational Podcasts, and Audiobooks <br />
            to gain some happiness, knowledge, and lighten your stress side by side.
          </h3>
        </div>
      </header>
      {/* Header Section Ends Here */}

      {/* Music Section */}
      <section id="music">
        <h1 className="section-headings">Music</h1>
        <div className="container">
          <div data-aos="fade-up" data-aos-duration="1000" className="collection">
            <h2>Stress Relief Sounds</h2>
            <div className="playlist">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1500" className="collection">
            <h2>Peaceful Guitar</h2>
            <div className="playlist">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0jgyAiPl8Af?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="2000" className="collection">
            <h2>Calm Nature Sounds</h2>
            <div className="playlist">
              
            </div>
          </div>
        </div>
      </section>
      {/* Music Section Ends Here */}

      <hr />

      {/* Podcasts Section */}
      <section id="podcasts">
        <h1 className="section-headings">Podcasts</h1>
        <div className="collection">
          {[ 
            "https://open.spotify.com/embed/episode/4ahVo34YZsDDtCgXX5KS5P?utm_source=generator",
            "https://open.spotify.com/embed/episode/0vEWGG6S1wL6IbxJsxb3sF?utm_source=generator",
          ].map((src, index) => (
            <div key={index} data-aos="fade-up" data-aos-duration="800" className="show">
              <iframe
                src={src}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </div>
          ))}
        </div>
      </section>
      {/* Podcasts Section Ends Here */}

      <hr />
    </div>
  );
};

export default Audio;
