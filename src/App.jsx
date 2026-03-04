import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import DigitalTwinProfile from './components/DigitalTwinProfile';
import VitalityLanding from './components/VitalityLanding';
import AuthPage from './components/AuthPage';
import GymAuthPage from './components/GymAuthPage';
import StreakDashboard from './components/StreakDashboard';
import { Layers, Monitor, Activity, ShieldCheck, Dumbbell, Flame } from 'lucide-react';

function App() {
    const [view, setView] = useState('vitality');

    return (
        <div className="min-h-screen bg-[#070b14]">
            {/* Dev Navigation Bar for switching views effortlessly */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B1320]/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center px-8 shadow-xl">
                <div className="flex items-center gap-2">
                    <Layers className="text-[#00E5FF]" size={20} />
                    <span className="text-white font-bold tracking-widest text-sm">PROTOTYPE HUB</span>
                </div>
                <div className="flex bg-[#111827] rounded-lg p-1 border border-white/10 overflow-x-auto max-w-[70vw]">
                    <button
                        onClick={() => setView('auth')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all whitespace-nowrap ${view === 'auth' ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <ShieldCheck size={16} /> FairPlay Auth
                    </button>
                    <button
                        onClick={() => setView('auth-gym')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all whitespace-nowrap ${view === 'auth-gym' ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Dumbbell size={16} /> Gym App Auth
                    </button>
                    <button
                        onClick={() => setView('streak')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all whitespace-nowrap ${view === 'streak' ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Flame size={16} /> Streak Dashboard
                    </button>
                    <button
                        onClick={() => setView('vitality')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all whitespace-nowrap ${view === 'vitality' ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.5)]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Activity size={16} /> Vitality Landing
                    </button>
                    <button
                        onClick={() => setView('admin')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all whitespace-nowrap ${view === 'admin' ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.5)]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Monitor size={16} /> FairPlay Admin
                    </button>
                    <button
                        onClick={() => setView('viewer')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all whitespace-nowrap ${view === 'viewer' ? 'bg-[#00E5FF] text-[#070b14] shadow-[0_0_15px_rgba(0,229,255,0.5)]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Layers size={16} /> FairPlay Viewer (3D)
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`${['vitality', 'auth', 'auth-gym', 'streak'].includes(view) ? 'pt-0' : 'pt-16'} h-screen overflow-y-auto`}>
                {view === 'admin' && <AdminDashboard />}
                {view === 'viewer' && <DigitalTwinProfile />}
                {view === 'vitality' && <VitalityLanding onLoginClick={() => setView('auth-gym')} />}
                {view === 'auth' && <AuthPage onLogin={() => setView('viewer')} />}
                {view === 'auth-gym' && <GymAuthPage onLogin={() => setView('streak')} />}
                {view === 'streak' && <StreakDashboard />}
            </div>
        </div>
    );
}

export default App;
