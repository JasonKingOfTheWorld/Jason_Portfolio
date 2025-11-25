import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { X, Send, Bot, Loader2, Sparkles, Terminal } from 'lucide-react';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Wake up, Neo... I mean, Jason. The system is online. Ask me about design systems.', timestamp: Date.now() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(history, input);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-6 w-80 sm:w-96 h-[500px] glass-neo rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 border border-brand/40">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand/20 to-transparent p-4 flex justify-between items-center border-b border-brand/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-brand/20 flex items-center justify-center border border-brand/50">
                <Terminal size={16} className="text-brand" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-widest font-mono">OPERATOR</div>
                <div className="text-[10px] text-brand font-mono flex items-center gap-1 uppercase">
                  <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></span> Connected
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-brand/50 hover:text-brand transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-sm rounded-md backdrop-blur-md font-mono ${
                    msg.role === 'user' 
                      ? 'bg-brand/20 text-white border border-brand/30' 
                      : 'bg-black/40 text-brand border border-brand/20'
                  }`}
                >
                    {msg.text}
                </div>
                <span className="text-[10px] text-zinc-600 mt-1 px-2 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-brand/5 px-4 py-2 rounded-full border border-brand/10 flex gap-2 items-center">
                    <Loader2 size={14} className="animate-spin text-brand" />
                    <span className="text-xs text-brand/70 font-mono">Decrypting...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-black/40 backdrop-blur border-t border-brand/20">
            <div className="flex items-center gap-2 bg-black/60 border border-brand/20 rounded-md px-4 py-2 focus-within:border-brand focus-within:bg-brand/5 transition-all">
              <span className="text-brand font-mono">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-brand placeholder-brand/30 font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="text-brand hover:text-white disabled:opacity-30 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-brand hover:bg-white hover:text-brand text-black shadow-neon flex items-center justify-center transition-all duration-300 group hover:scale-110 border border-brand/50"
      >
        {isOpen ? <X size={24} /> : <Terminal size={24} className="animate-pulse" />}
      </button>
    </div>
  );
};

export default AIChat;