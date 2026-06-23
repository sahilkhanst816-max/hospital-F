import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Server } from 'lucide-react';

const Chatbot = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  
  // 🔥 FIX 1: 'bot' ki jagah 'assistant' kiya
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! Main tumhara AI assistant hu. Main tumhari kaise madad kar sakta hu?' }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:1234/v1/models');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setModels(data.data);
          setSelectedModel(data.data[0].id);
        }
      } catch (error) {
        console.error("Models laane mein error:", error);
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 🔥 Endpoint /v1/chat/completions hai
      const response = await fetch('http://localhost:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...messages, userMessage], 
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "No response from AI.";

      setMessages((prev) => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error("Message bhejne mein error:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Error: AI se connect nahi ho paya." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FDFBF7] p-4 font-sans">
      <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 p-4 px-6 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg tracking-tight">AI Assistant</h2>
              <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            <Server size={14} className="text-gray-500" />
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer w-32 truncate"
            >
              {models.length === 0 ? (
                <option>Loading models...</option>
              ) : (
                models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.id}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gray-800 text-white rounded-tr-sm' 
                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm rounded-tl-sm flex items-center gap-2 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm font-medium">Phi-3 is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 px-6 border-t border-gray-100">
          <form onSubmit={sendMessage} className="flex gap-3 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message AI Assistant..."
              disabled={isLoading}
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-full pl-6 pr-14 py-3.5 focus:outline-none focus:ring-2 focus:ring-gray-800/20 focus:bg-white transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;