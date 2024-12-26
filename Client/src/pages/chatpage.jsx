import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Send, Smile, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion'; // Add animations
import Button from "@/components/ui/button"; // Adjust the relative path based on folder structure
import { ChevronRight } from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: 'system' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: `You said: ${inputMessage}`,
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);

      setInputMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #8B3C3C, #4D2C2C)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <header style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(to right, #3B82F6, #9333EA)',
        color: 'white',
        width: '100%',
        padding: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <motion.div
            style={{
              width: '3rem',
              height: '3rem',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3B82F6',
              fontWeight: 'bold'
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI
          </motion.div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Feminah Personalized Assistant</h2>
        </div>
      </header>

      <div style={{
        background: 'white',
        color: 'black',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '91.666%',
        maxWidth: '40rem',
        marginTop: '1.5rem',
        padding: '1.5rem'
      }}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                background: msg.sender === 'user' ? 'linear-gradient(to right, #3B82F6, #9333EA)' : '#E5E7EB',
                color: msg.sender === 'user' ? 'white' : 'black',
                textAlign: msg.sender === 'system' ? 'center' : 'left',
                fontStyle: msg.sender === 'system' ? 'italic' : 'normal'
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showEmojiPicker && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            bottom: '5rem',
            right: '1rem',
            zIndex: 50
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </motion.div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1rem',
        width: '91.666%',
        maxWidth: '40rem'
      }}>
        <button style={{
          color: '#9CA3AF',
          transition: 'color 0.2s',
          border: 'none',
          background: 'none'
        }} onMouseEnter={(e) => e.target.style.color = '#3B82F6'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
          <Paperclip size={24} />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{
            flexGrow: 1,
            padding: '0.5rem',
            border: '1px solid #D1D5DB',
            borderRadius: '9999px',
            outline: 'none',
            transition: 'box-shadow 0.2s',
            boxShadow: '0 0 0 2px transparent'
          }}
          onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #3B82F6'}
          onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
        />
        <Button variant="outline" size="icon" onClick={sendMessage}>
          <ChevronRight />
        </Button>
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '0.75rem',
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <Link
          to="/homepage"
          style={{ textAlign: 'center', color: '#4B5563', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#8B3C3C'}
          onMouseLeave={(e) => e.target.style.color = '#4B5563'}
        >
          <div>🏠</div>
          <span style={{ fontSize: '0.75rem' }}>Home</span>
        </Link>
        <Link
          to="/chatpage"
          style={{ textAlign: 'center', color: '#4B5563', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#8B3C3C'}
          onMouseLeave={(e) => e.target.style.color = '#4B5563'}
        >
          <div>🤖</div>
          <span style={{ fontSize: '0.75rem' }}>AI Chat</span>
        </Link>
        <Link
          to="/calendar"
          style={{ textAlign: 'center', color: '#4B5563', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#8B3C3C'}
          onMouseLeave={(e) => e.target.style.color = '#4B5563'}
        >
          <div>📅</div>
          <span style={{ fontSize: '0.75rem' }}>Calendar</span>
        </Link>
        <Link
          to="/profile"
          style={{ textAlign: 'center', color: '#4B5563', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.target.style.color = '#8B3C3C'}
          onMouseLeave={(e) => e.target.style.color = '#4B5563'}
        >
          <div>👤</div>
          <span style={{ fontSize: '0.75rem' }}>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default ChatPage;
