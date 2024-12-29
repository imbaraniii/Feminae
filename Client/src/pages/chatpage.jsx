import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classNames from "classnames";
import WordFadein from "../components/ui/word-fade-in";
import Card from "../components/ui/cards";

const saveChatHistory = (chatHistory) => {
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
};

const loadChatHistory = () => {
  const savedHistory = localStorage.getItem("chatHistory");
  return savedHistory ? JSON.parse(savedHistory) : [];
};

const ResponsiveChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState(loadChatHistory());
  const chatBoxRef = useRef(null);

  useEffect(() => {
    saveChatHistory(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const standardPrompts = [
    "What is your name?",
    "How can I assist you today?",
    "Tell me more about your project.",
    "What are the challenges you're facing?",
  ];

  const sendMessage = (message) => {
    if (message.trim() === "") return;
    const newMessage = { text: message, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setCurrentMessage("");
    simulateBotResponse();
    setIsSidebarOpen(false);
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
  };

  const simulateBotResponse = () => {
    setTimeout(() => {
      const botReply = "This is a bot reply!";
      const botMessage = { text: <WordFadein words={botReply} delay={0.10} textSize="1xl" textOpacity={1} textColor="text-black" fontWeight="font-weight-0" />, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(currentMessage);
    }
  };

  return (
    <>
      <div className="chat-container h-screen w-screen flex flex-col md:flex-row bg-pink-400 overflow-hidden">
        <div
          className={classNames(
            "fixed top-0 left-0 h-screen w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-[#FFE2E2] text-[#86A788] p-4 z-10 shadow-lg transition-transform transform flex flex-col justify-between",
            {
              "translate-x-0": isSidebarOpen,
              "-translate-x-full": !isSidebarOpen,
              "md:static md:translate-x-0 md:block": true,
            }
          )}
        >
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-600"
            onClick={() => window.location.reload()}
          >
            New Chat
          </button>
        </div>

        <div className={classNames(
          "chat-interface flex flex-col flex-grow transition-transform transform p-4 bg-gray-100 overflow-hidden",
          {
            "translate-x-3/4 sm:translate-x-1/2 md:translate-x-1/3 lg:translate-x-0": isSidebarOpen,
            "translate-x-0": !isSidebarOpen,
          }
        )}>
          <div ref={chatBoxRef} className="chat-box flex-grow overflow-y-auto p-3 bg-white rounded-md border border-gray-300" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {messages.length === 0 ? (
              <>
                <div className="text-center text-gray-700 flex items-center justify-center">
                  <WordFadein words="Welcome to the chat! How can I assist you today?" delay={0.10} />
                </div>
                <div className="flex flex-row overflow-x-auto w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <Card title="Welcome to the chat! How can I assist you today?" description="This is a bot reply!" />
                  <Card title="Welcome to the chat! How can I assist you today?" description="This is a bot reply!" />
                  <Card title="Welcome to the chat! How can I assist you today?" description="This is a bot reply!" />
                  <Card title="Welcome to the chat! How can I assist you today?" description="This is a bot reply!" />
                  <Card title="Welcome to the chat! How can I assist you today?" description="This is a bot reply!" />
                </div>
              </>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`message mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block p-2 rounded-lg text-base max-w-xs ${message.sender === "user" ? "bg-[#EBEAFF] text-[#000102]" : "bg-[#EBEAFF] text-[#000102]"}`} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {message.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="message-input mt-4 flex">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none resize-none overflow-hidden input-box"
              rows="1"
            />
            <button
              onClick={() => sendMessage(currentMessage)}
              className="bg-[#7ED4AD] text-white px-4 py-2 rounded-r-md hover:bg-blue-600 active:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
        {!isSidebarOpen && (
          <button
            className="md:hidden fixed top-4 left-4 bg-pink-500 text-white p-2 rounded-full z-20"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>
        )}
      </div>
    </>
  );
};

export default ResponsiveChatUI;
