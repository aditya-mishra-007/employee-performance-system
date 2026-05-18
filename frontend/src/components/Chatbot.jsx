import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Welcome Admin. Ask me anything about employee promotions, training gaps, or talent allocation optimization.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Forward message to the free OpenRouter proxy endpoint
            const res = await axios.post('http://localhost:5000/api/ai/chat', { prompt: input });
            const botMessage = { role: 'assistant', content: res.data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'system', content: 'Connection timed out. Ensure backend chat script hooks are mounted.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Toggle Floating Action Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="bg-gradient-to-tr from-indigo-600 to-purple-600 hover:scale-105 text-white p-4 rounded-full shadow-2xl transition duration-200 transform focus:outline-none flex items-center justify-center border border-white/20"
            >
                {isOpen ? (
                    <span className="text-xl font-bold">×</span>
                ) : (
                    <span className="text-xl">💬</span>
                )}
            </button>

            {/* Chat Box Container */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 md:w-96 h-[450px] bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
                    {/* Header bar */}
                    <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-4 border-b border-white/10 flex items-center space-x-3">
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
                        <div>
                            <h4 className="text-white font-bold text-sm tracking-wide">HR Intelligence AI</h4>
                            <p className="text-[10px] text-white/40 font-medium">Real-time Strategy Optimization Assistant</p>
                        </div>
                    </div>

                    {/* Messages feed area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin text-xs">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-md ${
                                    msg.role === 'user' 
                                        ? 'bg-indigo-600 text-white rounded-br-none' 
                                        : msg.role === 'system'
                                        ? 'bg-slate-800/50 text-indigo-300 border border-indigo-500/10 font-medium'
                                        : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/5'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 text-white/50 rounded-xl px-4 py-2 flex items-center space-x-1.5 border border-white/5 animate-pulse">
                                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Footer interactive typing console input */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="Ask about promotions, rankings..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                            className="flex-1 bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 placeholder-white/30"
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-2 rounded-lg transition text-xs"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;