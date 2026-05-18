import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ fetchEmployees }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', department: '', skills: '', performanceScore: '', experience: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        const formattedSkills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        
        try {
            const token = localStorage.getItem('token');
            // Wired directly to live backend URL
            await axios.post('https://employee-performance-system-mq1p.onrender.com/api/employees', {
                ...formData,
                skills: formattedSkills,
                performanceScore: Number(formData.performanceScore),
                experience: Number(formData.experience)
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setSuccess('✨ Employee safely onboarded to cluster.');
            setFormData({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
            fetchEmployees();
        } catch (err) {
            setError(err.response?.data?.error || 'Execution pipeline rejected entry');
        }
    };

    return (
        <div className="w-full bg-[#0d111c]/70 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] text-left ring-1 ring-white/5">
            <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
                <h2 className="text-xl font-bold text-white tracking-wide">Register Employee</h2>
            </div>
            
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-xs font-semibold">{error}</div>}
            {success && <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 p-3 rounded-xl mb-4 text-xs font-semibold">{success}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Employee Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all placeholder-white/20" placeholder="e.g. Aman Verma" />
                </div>
                <div>
                    <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all placeholder-white/20" placeholder="e.g. aman@gmail.com" />
                </div>
                <div>
                    <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all placeholder-white/20" placeholder="e.g. Development" />
                </div>
                <div>
                    <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Skills Inventory</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} required className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all placeholder-white/20" placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Perf. Score</label>
                        <input type="number" name="performanceScore" value={formData.performanceScore} onChange={handleChange} required min="0" max="100" className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all placeholder-white/20" placeholder="0-100" />
                    </div>
                    <div>
                        <label className="block text-cyan-400/70 text-[11px] font-bold uppercase tracking-widest mb-1.5">Experience</label>
                        <input type="number" name="experience" value={formData.experience} onChange={handleChange} required min="0" className="w-full bg-[#020617]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all placeholder-white/20" placeholder="Years" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition shadow-[0_4px_20px_rgba(6,182,212,0.3)] text-sm tracking-widest uppercase mt-4">
                    Commit to Registry
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;