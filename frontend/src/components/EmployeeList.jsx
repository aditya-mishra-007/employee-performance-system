import React, { useState } from 'react';

const EmployeeList = ({ employees, onSearch, onSelectAI, onTriggerBasicMatch, onTriggerAIShortlist, onDeleteEmployee }) => {
    const [searchDept, setSearchDept] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchDept);
    };

    return (
        <div className="w-full bg-[#0d111c]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl text-left text-white ring-1 ring-white/5">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4 border-b border-white/10 pb-5">
                <div>
                    <h2 className="text-xl font-bold tracking-wide text-white">Active Talents Database</h2>
                    <p className="text-white/40 text-xs mt-0.5">Real-time analytical mapping indices</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1 sm:flex-initial">
                        <input 
                            type="text" 
                            placeholder="Query Department..." 
                            value={searchDept} 
                            onChange={(e) => setSearchDept(e.target.value)}
                            className="bg-[#020617]/90 border border-white/10 rounded-xl px-4 py-2 focus:outline-none text-xs text-white placeholder-white/30 w-full sm:w-44 focus:border-cyan-500 transition"
                        />
                        <button type="submit" className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold px-4 py-2 rounded-xl transition uppercase tracking-wider">
                            Filter
                        </button>
                    </form>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={onTriggerBasicMatch}
                            className="bg-[#090d16] hover:bg-[#111827] border border-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-150 flex items-center space-x-1.5 tracking-wider"
                        >
                            <span>BASIC MATCH</span> <span>📊</span>
                        </button>
                        <button 
                            onClick={onTriggerAIShortlist}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-150 flex items-center space-x-1.5 tracking-wider shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                        >
                            <span>⚙️</span> <span>AI SHORTLIST</span> <span>✨</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-cyan-400/80 text-[10px] uppercase tracking-widest font-bold">
                            <th className="pb-3 pr-2">Employee Node</th>
                            <th className="pb-3 pr-2">Department</th>
                            <th className="pb-3 pr-2">Skills Inventory</th>
                            <th className="pb-3 pr-2 text-center">Score</th>
                            <th className="pb-3 pr-2 text-center">Tenure</th>
                            <th className="pb-3 text-center">Neural Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-12 text-white/30 italic">No nodes matching runtime parameter queries.</td>
                            </tr>
                        ) : (
                            employees.map((emp) => (
                                <tr key={emp._id} className="hover:bg-white/[0.02] transition duration-150 group">
                                    <td className="py-4 font-semibold text-white group-hover:text-cyan-300 transition pr-2">{emp.name}</td>
                                    <td className="py-4 text-slate-400 pr-2">{emp.department}</td>
                                    <td className="py-4 pr-2">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {emp.skills.map((s, idx) => (
                                                <span key={idx} className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] px-2 py-0.5 rounded-md font-medium tracking-wide">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 text-center pr-2">
                                        <span className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] ${
                                            emp.performanceScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            emp.performanceScore >= 50 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                            {emp.performanceScore}%
                                        </span>
                                    </td>
                                    <td className="py-4 text-center text-slate-300 pr-2">{emp.experience} Yrs</td>
                                    <td className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => onSelectAI(emp._id)} 
                                                className="bg-[#020617] hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-400 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 tracking-wider uppercase whitespace-nowrap"
                                            >
                                                Run AI
                                            </button>
                                            {/* ======= NEW ACTIONABLE DELETE BUTTON MODULE ======= */}
                                            <button 
                                                onClick={() => {
                                                    if(window.confirm(`Permanently remove ${emp.name} from cloud registry?`)) {
                                                        onDeleteEmployee(emp._id);
                                                    }
                                                }} 
                                                className="bg-red-500/10 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all duration-200 tracking-wider uppercase"
                                            >
                                                Delete
                                            </button>
                                            {/* =================================================== */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;