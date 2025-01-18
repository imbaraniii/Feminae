import React from "react";
import { useNavigate } from "react-router-dom";
import "./books.css";

const Books = () => {
  const navigate = useNavigate();

  return (
    <div className="books-page">
      {/* Back Button */}
      <button
        className="back-button-top-right"
        onClick={() => navigate("/therapy")}
      >
        Back
      </button>

      {/* Summary of Books Section */}
      <section id="summary" className="black-background">
        <h1 style={{ fontSize: "2.3rem" }}>Summary of Books</h1>
        <h2>In Articles</h2>
        <div className="collection">
          <div className="books">
            <div className="playlist">
              <iframe
                className="b"
                src="https://www.samuelthomasdavies.com/book-summaries/self-help/atomic-habits/"
                frameBorder="0"
                width="100%"
                height="380px"
                title="Atomic Habits Summary"
              ></iframe>
            </div>
            <div className="playlist">
              <iframe
                className="b"
                src="https://jamesclear.com/book-summaries/the-subtle-art-of-not-giving-a-fck"
                frameBorder="0"
                width="100%"
                height="380px"
                title="The Subtle Art Summary"
              ></iframe>
            </div>
            <div className="playlist">
              <iframe
                className="b"
                src="https://wizbuskout.com/think-like-a-monk-summary/"
                frameBorder="0"
                width="100%"
                height="380px"
                title="Think Like a Monk Summary"
              ></iframe>
            </div>
          </div>
        </div>

        <h2>In Videos</h2>
        <div className="videos">
          <div className="videos1">
            <div className="v">
              <iframe
                width="100%"
                height="280"
                src="https://www.youtube.com/embed/PZ7lDrwYdZc"
                title="Book Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="v">
              <iframe
                width="100%"
                height="280"
                src="https://www.youtube.com/embed/Zxj3P0enJNQ"
                title="Book Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="v">
              <iframe
                width="100%"
                height="280"
                src="https://www.youtube.com/embed/8OAH3hqNsN4"
                title="Book Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="v">
              <iframe
                width="100%"
                height="280"
                src="https://www.youtube.com/embed/9g1BfGpoK3E"
                title="Book Video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* Articles Section */}
      <section id="articles" className="black-background">
        <h1 style={{ fontSize: "2.3rem" }}>Articles</h1>
        <h2>Inspirational Stories</h2>
        <div className="collection">
          <div className="playlist">
            <iframe
              src="https://ahigherthought.com/the-best-way-to-refresh-mind-body-soul/"
              frameBorder="0"
              width="100%"
              height="380px"
              title="Inspirational Story 1"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
