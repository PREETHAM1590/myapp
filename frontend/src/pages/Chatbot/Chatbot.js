import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Lightbulb, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm WiseBot, your recycling assistant. Ask me anything about waste management, recycling tips, or eco-friendly practices!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chatbot`, {
        message: inputText
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.message,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback responses for demo
      const fallbackResponses = {
        plastic: "Plastic items should be cleaned before recycling. Check the recycling number on the bottom - numbers 1, 2, and 5 are most commonly recycled. Remove caps and labels when possible!",
        glass: "Glass is 100% recyclable and can be recycled endlessly! Rinse containers clean and remove metal lids. Different colored glass should be separated if your area requires it.",
        paper: "Paper products are great for recycling! Make sure they're clean and dry. Remove any plastic windows from envelopes and separate newspaper from cardboard.",
        batteries: "Batteries contain hazardous materials and need special handling! Never put them in regular recycling. Take them to designated battery collection points at stores or recycling centers.",
        electronics: "E-waste should go to certified recycling centers, not regular bins. Many components contain valuable materials that can be recovered and reused safely.",
        default: "I'm here to help with recycling questions! You can ask me about specific materials like plastic, glass, paper, electronics, or general recycling tips. What would you like to know?"
      };

      let response = fallbackResponses.default;
      const messageLower = inputText.toLowerCase();
      
      for (const [key, value] of Object.entries(fallbackResponses)) {
        if (key !== 'default' && messageLower.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How do I recycle plastic bottles?",
    "What can I do with old electronics?",
    "Are pizza boxes recyclable?",
    "How do I dispose of batteries?",
    "Can I recycle broken glass?",
    "What's the best way to compost?"
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex-shrink-0">
        <div className="flex items-center max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 text-gray-500 hover:text-primary-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center ml-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WiseBot</h1>
              <p className="text-xs text-green-600">Online • Recycling Assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-primary-500' 
                    : 'bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-xs">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4 max-w-md mx-auto w-full">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <h3 className="font-medium text-gray-900">Quick Questions</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="max-w-md mx-auto">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about recycling..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 max-h-24"
                rows="1"
                style={{
                  minHeight: '48px',
                  height: 'auto'
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || loading}
              className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="bg-green-50 border-t border-green-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-sm text-green-700">
            <Recycle className="w-4 h-4" />
            <p>💡 Tip: I can help you identify recyclable items and provide disposal instructions!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;