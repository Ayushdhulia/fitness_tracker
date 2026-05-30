import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { 
  Send, Bot, User, BrainCircuit, Sparkles, 
  Terminal, ShieldCheck, Zap, MessageSquareCode,
  Loader2, Trash2
} from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Tactical Intelligence Online. I am your Elite Fitness Strategist. How can I optimize your performance today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.post('/ai/chat', { message: input });
      const assistantMessage = { 
        role: 'assistant', 
        content: response.data.message,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = { 
        role: 'assistant', 
        content: "System Note: Unable to establish a real-time link with the AI Command Center. Please verify your network and API credentials.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pt-32 pb-20 px-6 h-screen flex flex-col">
      <div className="glass-pro rounded-3xl border-white/10 flex flex-col flex-1 overflow-hidden bg-black/40 shadow-2xl">
        
        {/* Chat Header */}
        <div className="p-8 border-b border-white/10 bg-white/5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-600/20">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white italic flex items-center">
                Tactical AI <Sparkles className="ml-2 w-5 h-5 text-blue-400" />
              </h2>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                Systems Operational
              </p>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ role: 'assistant', content: 'System reboot complete. Awaiting directives.', timestamp: new Date().toLocaleTimeString() }])}
            className="p-3 text-gray-500 hover:text-white transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex items-start space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-3 rounded-xl shadow-md ${msg.role === 'user' ? 'bg-blue-600' : 'bg-white/5 border border-white/10'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-blue-400" />}
                </div>
                <div className="space-y-1">
                  <div className={`p-6 rounded-2xl text-lg font-bold shadow-xl leading-relaxed ${
                    msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-center space-x-3 text-blue-400 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Analyzing tactical data...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-8 border-t border-white/10 bg-black/60">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for tactical intelligence..."
              className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-white font-bold text-lg focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
