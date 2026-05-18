import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = ({ onAuthSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
        const targetUrl = `https://employee-performance-system-mq1p.onrender.com${endpoint}`;
        
        const dataPayload = isLoginView ? { email, password } : { name, email, password };

        try {
            const res = await axios.post(targetUrl, dataPayload);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                onAuthSuccess(res.data.token);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication network connection failure.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col justify-center items-center px-4 font-sans antialiased text-white">
            <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-[#0d111c]/70 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] text-left z-10">
                <div className="text-center mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        {isLoginView ? 'Login Node' : 'Registration Node'}
                    </span>
                    <h2 className="text-2xl font-extrabold mt-4 tracking-tight">
                        {isLoginView ? 'Simple Login' : 'Create Account'}
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">
                        {isLoginView ? 'Enter your administrative credentials to sign in.' : 'Sign up to register a new admin profile layer.'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-xs font-semibold">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                    {!isLoginView && (
                        <div>
                            <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all" placeholder="Enter Name" />
                        </div>
                    )}

                    <div>
                        <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all" placeholder="admin@analytics.com" />
                    </div>

                    <div>
                        <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all" placeholder="••••••••••••" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition shadow-[0_4px_20px_rgba(6,182,212,0.3)] text-sm tracking-widest uppercase mt-2">
                        {loading ? 'Processing...' : isLoginView ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-white/5 pt-5 flex justify-center">
                    <button 
                        onClick={() => { setIsLoginView(!isLoginView); setError(''); }} 
                        className="inline-block text-xs text-slate-400 hover:text-cyan-400 bg-transparent hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/10 px-4 py-2 rounded-xl font-medium tracking-wide transition-all duration-200 select-none cursor-pointer active:scale-95 active:bg-cyan-500/10"
                    >
                        {isLoginView ? "Don't have an account? Create one" : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;