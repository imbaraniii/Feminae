import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Loader,
  ChevronRight,
  ChevronLeft,
  Camera,
  Mic,
} from "lucide-react";
import "./chatpage.css";
import { Link } from "react-router-dom";

const PROMPT_SUGGESTIONS = [
  {
    id: 1,
    title: "Diet Plan",
    prompt: "Give me a Diet Plan with my medical conditions for 3 days.",
  },
  {
    id: 2,
    title: "Health",
    prompt: "With my Medical condition, am I allowed to eat curd?",
  },
  {
    id: 3,
    title: "Stress Management",
    prompt: "What are effective ways to manage stress with my condition?",
  },
  {
    id: 4,
    title: "Daily Routine",
    prompt: "How should I structure my routine with my medical condition?",
  },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { text: query, sender: "user" }]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <Link to="/dashboard">
            <button className="new-chat-button">Dashboard</button>
          </Link>
          <Link to="/calendar">
            <button className="new-chat-button">Calendar</button>
          </Link>
          <Link to="/profile">
            <button className="new-chat-button">Profile</button>
          </Link>
        </div>
        <div className="prompts-list">
          {PROMPT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.id}
              className="prompt-suggestion-item"
              onClick={() => setQuery(suggestion.prompt)}
            >
              <div className="prompt-title">{suggestion.title}</div>
              <div className="prompt-preview">{suggestion.prompt}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        className={`sidebar-toggle ${isSidebarOpen ? "" : "closed"}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      <div className="main-content">
        <div className="chat-container">
          <div className="chat-header">
            <MessageCircle className="text-blue-500 w-8 h-8" />
            <h1 className="app-title">Feminae Bot</h1>
          </div>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-wrapper ${
                  message.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">{message.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="bot-message">
                <Loader className="w-5 h-5 animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSearch} className="input-container">
            <button type="button" className="icon-button">
              <Camera className="w-6 h-6" />
            </button>
            <button type="button" className="icon-button">
              <Mic className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your medical question..."
              className="message-input"
            />
            <button
              type="submit"
              className="send-button"
              disabled={isLoading || !query.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
