import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import AiRecommendation from './components/AiRecommendation';
import Chatbot from './components/Chatbot';
import ShortlistModal from './components/ShortlistModal';
import Login from './components/Login'; // Import Login view wrapper

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null, loading: false });

    const API_BASE_URL = 'https://employee-performance-system-mq1p.onrender.com';

    const fetchEmployees = useCallback(async (department = '') => {
        if (!token) return;
        try {
            let url = `${API_BASE_URL}/api/employees`;
            if (department) {
                url = `${API_BASE_URL}/api/employees/search?department=${encodeURIComponent(department)}`;
            }
            const res = await axios.get(url);
            setEmployees(res.data.data);
        } catch (error) {
            console.error('Core collection sync error:', error);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setEmployees([]);
    };

    const handleTriggerBasicMatch = async () => {
        setModalConfig({ isOpen: true, type: 'basic', data: [], loading: true });
        try {
            const res = await axios.get(`${API_BASE_URL}/api/ai/basic-match`);
            setModalConfig(prev => ({ ...prev, data: res.data.data, loading: false }));
        } catch (err) {
            console.error(err);
            setModalConfig(prev => ({ ...prev, loading: false }));
        }
    };

    const handleTriggerAIShortlist = async () => {
        setModalConfig({ isOpen: true, type: 'ai', data: '', loading: true });
        try {
            const res = await axios.post(`${API_BASE_URL}/api/ai/shortlist`);
            setModalConfig(prev => ({ ...prev, data: res.data.shortlist, loading: false }));
        } catch (err) {
            console.error(err);
            setModalConfig(prev => ({ ...prev, data: 'Connection pipeline failure parsing database records.', loading: false }));
        }
    };

    useEffect(() => {
        if (token) {
            fetchEmployees();
        }
    }, [token, fetchEmployees]);

    // Conditional Routing: Render Auth view wrapper if token is absent
    if (!token) {
        return <Login onLoginSuccess={(newToken) => setToken(newToken)} />;
    }

    return (
        <div className="min-h-screen bg-[#030712] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-left">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <header className="max-w-7xl mx-auto mb-10 border-b border-white/5 pb-6 relative z-10 flex justify-between items-end">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                        B.Tech 4th SEMESTER EVALUATION ENDPOINT [2025-26]
                    </span>
                    <h1 className="text-4xl font-extrabold mt-3 text-white tracking-tight sm:text-5xl">
                        AI-Driven Employee Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400">Analytics System</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-2 max-w-xl font-medium">
                        Fully responsive production dashboard integrated with multi-layer schemas and public router pipelines.
                    </p>
                </div>
                
                {/* High-Contrast Interactive Logout Action Button Component */}
                <button 
                    onClick={handleLogout}
                    className="bg-red-500/10 hover:bg-red-600 border border-red-500/20 hover:border-transparent text-red-400 hover:text-white text-xs font-black px-5 py-2.5 rounded-xl transition duration-150 tracking-widest uppercase mb-1 shadow-[0_0_15px_rgba(239,68,68,0.05)] active:scale-95"
                >
                    Disconnect Session 🚪
                </button>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                <div className="lg:col-span-4 w-full">
                    <EmployeeForm fetchEmployees={fetchEmployees} />
                </div>
                <div className="lg:col-span-8 w-full">
                    <EmployeeList 
                        employees={employees} 
                        onSearch={fetchEmployees} 
                        onSelectAI={setSelectedEmployeeId} 
                        onTriggerBasicMatch={handleTriggerBasicMatch}
                        onTriggerAIShortlist={handleTriggerAIShortlist}
                    />
                </div>
            </main>

            {selectedEmployeeId && (
                <AiRecommendation 
                    employeeId={selectedEmployeeId} 
                    onClose={() => setSelectedEmployeeId(null)} 
                />
            )}

            {modalConfig.isOpen && (
                <ShortlistModal 
                    type={modalConfig.type}
                    data={modalConfig.data}
                    loading={modalConfig.loading}
                    onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                />
            )}

            <Chatbot />
        </div>
    );
}

export default App;