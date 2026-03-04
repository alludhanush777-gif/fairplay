import React, { useState } from 'react';
import { Calendar, Users, Activity, Play, Plus, Clock, Search, ChevronRight } from 'lucide-react';
import usePlayerStore from '../store/playerStore';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const players = usePlayerStore((state) => state.players);
    const selectedPlayerId = usePlayerStore((state) => state.selectedPlayerId);
    const setSelectedPlayerId = usePlayerStore((state) => state.setSelectedPlayerId);
    const updatePlayerMetrics = usePlayerStore((state) => state.updatePlayerMetrics);

    const activePlayer = players.find(p => p.id === selectedPlayerId) || players[0];

    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    const handleInputChange = (e) => {
        const val = e.target.value;
        const numVal = val === '' ? '' : Number(val);

        if (e.target.name === 'playerId') {
            setSelectedPlayerId(val);
            return;
        }

        const fieldMap = {
            hydrationLevel: 'hydration',
            oxygenIntake: 'o2',
            heartRate: 'hr',
            recoveryPercentage: 'recovery',
            topSpeed: 'topSpeed',
            agilityScore: 'agility',
            balanceScore: 'balance'
        };

        const storeField = fieldMap[e.target.name] || e.target.name;

        updatePlayerMetrics(selectedPlayerId, {
            [storeField]: numVal
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ text: 'Metrics updated in real-time!', type: 'success' });
        setTimeout(() => setStatusMessage({ text: '', type: '' }), 3000);
    };

    // Placeholder data for the schedule grid
    const schedule = [
        { time: '08:00 AM', class: 'Strength & Conditioning', trainer: 'Coach Miller', capacity: '12/15', type: 'performance' },
        { time: '10:00 AM', class: 'Vo2 Max Testing', trainer: 'Dr. Evans', capacity: '1/1', type: 'biofeedback' },
        { time: '01:00 PM', class: 'Agility Drills', trainer: 'Coach Miller', capacity: '14/15', type: 'performance' },
        { time: '03:30 PM', class: 'Recovery Protocol', trainer: 'Sarah J.', capacity: '8/10', type: 'recovery' },
        { time: '05:00 PM', class: 'Tactical Review', trainer: 'Head Coach', capacity: '22/30', type: 'general' },
    ];

    return (
        <div className="min-h-screen bg-[#0B1320] text-gray-100 font-sans p-6 selection:bg-[#FF5722] selection:text-white">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Activity className="text-[#FF5722]" size={32} />
                        FairPlay <span className="text-gray-500 font-light">Admin</span>
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Command Center for Player Analytics & Scheduling</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search players..."
                            className="bg-[#111827] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#FF5722] transition-colors"
                        />
                    </div>
                    <button className="bg-[#FF5722] hover:bg-[#e64a19] text-white px-5 py-2 rounded-lg font-medium shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all flex items-center gap-2">
                        <Plus size={20} /> New Player
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Data Entry */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#111827]/80 backdrop-blur-md rounded-xl p-6 border border-gray-800 shadow-xl">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-gray-800 pb-3">
                            <Users className="text-[#00E5FF]" size={24} />
                            Input Player Metrics
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Select Player</label>
                                <select
                                    name="playerId"
                                    value={selectedPlayerId}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0B1320] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF5722]"
                                >
                                    {players.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} - ID: {p.id}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Biofeedback Section */}
                            <div className="p-4 rounded-lg bg-[#0B1320] border border-gray-700/50">
                                <h3 className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-4">Biofeedback Updates</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-sm text-gray-300">Hydration Level</label>
                                            <span className="text-xs text-gray-500 font-mono">0-100%</span>
                                        </div>
                                        <input type="number" name="hydrationLevel" value={activePlayer?.hydration || ''} onChange={handleInputChange} placeholder="e.g. 92" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#00E5FF] focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1">O2 Intake</label>
                                            <input type="number" name="oxygenIntake" value={activePlayer?.o2 || ''} onChange={handleInputChange} placeholder="%" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#00E5FF] focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1">Heart Rate (Avg)</label>
                                            <input type="number" name="heartRate" value={activePlayer?.hr || ''} onChange={handleInputChange} placeholder="BPM" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#00E5FF] focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Section */}
                            <div className="p-4 rounded-lg bg-[#0B1320] border border-gray-700/50">
                                <h3 className="text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-4">Performance Metrics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Recovery %</label>
                                        <input type="number" name="recoveryPercentage" value={activePlayer?.recovery || ''} onChange={handleInputChange} placeholder="100" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#FF5722] focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Top Speed</label>
                                        <input type="number" name="topSpeed" value={activePlayer?.topSpeed || ''} onChange={handleInputChange} placeholder="km/h" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#FF5722] focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Agility (1-100)</label>
                                        <input type="number" name="agilityScore" value={activePlayer?.agility || ''} onChange={handleInputChange} placeholder="50" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#FF5722] focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Balance (1-100)</label>
                                        <input type="number" name="balanceScore" value={activePlayer?.balance || ''} onChange={handleInputChange} placeholder="50" required className="w-full bg-[#111827] border border-gray-700 rounded p-2 text-white font-mono focus:border-[#FF5722] focus:outline-none" />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-gray-800 hover:bg-[#FF5722] text-white py-3 rounded-lg font-bold transition-all mt-4 border border-gray-700 hover:border-[#FF5722]">
                                Submit Metrics to Twin
                            </button>

                            {statusMessage.text && (
                                <div className={`mt-3 p-3 text-sm text-center rounded ${statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : statusMessage.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                    {statusMessage.text}
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Right Column: Schedule & Overview */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#111827]/80 rounded-xl p-5 border border-gray-800 border-l-4 border-l-[#FF5722]">
                            <h4 className="text-gray-400 text-sm font-medium">Active Players</h4>
                            <p className="text-3xl font-bold font-mono mt-1 text-white">{players.length}</p>
                        </div>
                        <div className="bg-[#111827]/80 rounded-xl p-5 border border-gray-800 border-l-4 border-l-[#00E5FF]">
                            <h4 className="text-gray-400 text-sm font-medium">Avg Optimal Readiness</h4>
                            <p className="text-3xl font-bold font-mono mt-1 text-white">87%</p>
                        </div>
                        <div className="bg-[#111827]/80 rounded-xl p-5 border border-gray-800 border-l-4 border-l-purple-500">
                            <h4 className="text-gray-400 text-sm font-medium">Trainings Today</h4>
                            <p className="text-3xl font-bold font-mono mt-1 text-white">12</p>
                        </div>
                    </div>

                    {/* Schedule Grid */}
                    <div className="bg-[#111827]/80 backdrop-blur-md rounded-xl p-6 border border-gray-800 shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Calendar className="text-[#FF5722]" size={24} />
                                Training Schedule
                            </h2>
                            <div className="flex gap-2">
                                <button className="text-sm px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors">Today</button>
                                <button className="text-sm px-3 py-1 text-gray-400 hover:text-white transition-colors">Week</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                        <th className="pb-3 font-medium px-4">Time</th>
                                        <th className="pb-3 font-medium px-4">Class / Module</th>
                                        <th className="pb-3 font-medium px-4">Instructor</th>
                                        <th className="pb-3 font-medium px-4">Capacity</th>
                                        <th className="pb-3 font-medium px-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {schedule.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group">
                                            <td className="py-4 px-4 font-mono text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className="text-gray-500" />
                                                    {item.time}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-2 h-2 rounded-full ${item.type === 'performance' ? 'bg-[#FF5722]' :
                                                        item.type === 'biofeedback' ? 'bg-[#00E5FF]' :
                                                            'bg-purple-500'
                                                        }`}></span>
                                                    <span className="font-medium text-gray-100">{item.class}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-400">{item.trainer}</td>
                                            <td className="py-4 px-4">
                                                <span className="bg-[#0B1320] px-2 py-1 rounded text-xs font-mono border border-gray-700">
                                                    {item.capacity}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="p-2 text-gray-500 hover:text-[#FF5722] hover:bg-[#FF5722]/10 rounded transition-colors">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
