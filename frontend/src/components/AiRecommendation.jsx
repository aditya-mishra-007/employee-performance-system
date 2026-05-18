import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AiRecommendation = ({ employeeId, onClose }) => {
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAIRecommendations = async () => {
            if (!employeeId) return;
            setLoading(true);
            setError('');
            setInsight('');

            try {
                // Pointed to live backend recommendations URL
                const res = await axios.post('https://employee-performance-system-mq1p.onrender.com/api/ai/recommend', { employeeId });
                setInsight(res.data.recommendation);
            } catch (err) {
                setError(err.response?.data?.error || 'AI Evaluation runtime error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchAIRecommendations();
    }, [employeeId]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-slate-950 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[85vh]">
                <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-indigo-300">💡 Deep AI Performance Insights</h3>
                        <p className="text-white/40 text-xs mt-0.5">Automated promotional pipeline verification</p>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white font-bold text-2xl transition">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4 whitespace-pre-line text-sm leading-relaxed text-slate-200">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16 space-y-4">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white/50 text-xs tracking-wider animate-pulse font-medium">Running performance mapping algorithms via free OpenRouter tier...</p>
                        </div>
                    )}
                    {error && <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-xl text-center font-medium">{error}</div>}
                    {insight && <div className="bg-white/5 border border-white/5 p-5 rounded-xl leading-relaxed text-sm">{insight}</div>}
                </div>
            </div>
        </div>
    );
};

export default AiRecommendation;