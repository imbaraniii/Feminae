import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classNames from "classnames";

const ResponsiveChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const standardPrompts = [
    "What is your name?",
    "How can I assist you today?",
    "Tell me more about your project.",
    "What are the challenges you're facing?",
  ];

  const sendMessage = (message) => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: "user" }]);
    setCurrentMessage("");
    simulateBotResponse();
    setIsSidebarOpen(false);
  };

  const simulateBotResponse = () => {
    setTimeout(() => {
      const botReply = "This is a bot reply!";
      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot" }]);
    }, 1000);
  };

  return (
    <>
      <div className="chat-container h-screen w-screen flex flex-col lg:flex-row bg-gray-100">
        <div
          className={classNames(
            "fixed top-0 left-0 h-screen w-3/4 sm:w-1/2 lg:w-1/4 bg-blue-500 text-white p-4 z-10 shadow-lg transition-transform transform",
            {
              "translate-x-0": isSidebarOpen,
              "-translate-x-full": !isSidebarOpen,
              "lg:static lg:translate-x-0 lg:block": true,
            }
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Standard Prompts</h2>
            <button
              className="lg:hidden bg-blue-500 text-white p-2 rounded-full z-20"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ul className="space-y-2">
            {standardPrompts.map((prompt, index) => (
              <li
                key={index}
                className="cursor-pointer bg-blue-600 p-2 rounded hover:bg-blue-400"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        <div className={classNames(
          "chat-interface flex flex-col flex-grow transition-transform transform p-4 bg-gray-100",
          {
            "translate-x-3/4 sm:translate-x-1/2 lg:translate-x-0": isSidebarOpen,
            "translate-x-0": !isSidebarOpen,
          }
        )}>
          <div className="chat-box flex-grow overflow-y-auto p-3 bg-white rounded-md border border-gray-300">
            {messages.map((message, index) => (
              <div key={index} className={`message mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="message-input mt-4 flex">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              onClick={() => sendMessage(currentMessage)}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveChatUI;