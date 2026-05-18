import React from 'react';

const ShortlistModal = ({ type, data, onClose, loading }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
            <div className="bg-[#090d16] border border-cyan-500/20 w-full max-w-2xl rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] text-white flex flex-col max-h-[80vh]">
                <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                        <h3 className="text-lg font-bold tracking-wide text-cyan-400">
                            {type === 'basic' ? '📊 Algorithmic Top Performers' : '✨ Predictive AI Shortlist Matrix'}
                        </h3>
                        <p className="text-white/40 text-[11px] mt-0.5">Cross-node evaluations completed</p>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white font-bold text-2xl transition">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16 space-y-3">
                            <div className="w-9 h-9 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white/50 text-xs animate-pulse">Running advanced system aggregation diagnostics...</p>
                        </div>
                    ) : type === 'basic' ? (
                        <div className="space-y-2">
                            {!data || data.length === 0 ? (
                                <p className="text-white/40 text-sm text-center py-4">No employees currently match the performance benchmark threshold.</p>
                            ) : (
                                data.map(emp => (
                                    <div key={emp._id} className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5 text-left">
                                        <div>
                                            <h4 className="font-bold text-sm text-white">{emp.name}</h4>
                                            <p className="text-white/40 text-xs">{emp.department} • {emp.experience} Years Exp</p>
                                        </div>
                                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
                                            {emp.performanceScore}%
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="whitespace-pre-line text-sm leading-relaxed text-slate-300 bg-white/[0.02] border border-white/5 p-5 rounded-xl text-left">
                            {data}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShortlistModal;