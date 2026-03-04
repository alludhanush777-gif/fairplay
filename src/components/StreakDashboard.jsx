import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar, Target, Award, Zap, ChevronRight, Activity } from 'lucide-react';

const StreakDashboard = () => {

    // Mock user streak data
    const streakData = {
        currentStreak: 12,
        bestStreak: 28,
        totalWorkouts: 145,
        level: 'Gold',
        recentActivity: [
            { day: 'Mon', completed: true },
            { day: 'Tue', completed: true },
            { day: 'Wed', completed: true },
            { day: 'Thu', completed: true },
            { day: 'Fri', completed: false, isToday: true },
            { day: 'Sat', completed: false },
            { day: 'Sun', completed: false },
        ]
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-white font-sans p-6 md:p-10 selection:bg-[#ff4500] selection:text-white">

            <div className="max-w-6xl mx-auto space-y-8 mt-16">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2"
                        >
                            YOUR <span className="text-[#ff4500]">STREAK</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 font-medium"
                        >
                            Consistency is the key to mastery. Keep the fire alive.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-[#ff4500] to-orange-500 p-0.5 rounded-2xl shadow-[0_0_30px_rgba(255,69,0,0.3)]"
                    >
                        <div className="bg-[#141414] rounded-[15px] px-6 py-3 flex items-center gap-4">
                            <div className="bg-[#ff4500]/20 p-2 rounded-lg text-[#ff4500]">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Current Tier</p>
                                <p className="text-xl font-black text-white">{streakData.level} Member</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Fire Streak Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-1 md:col-span-2 bg-[#141414] rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
                    >
                        {/* Background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff4500]/10 blur-[100px] rounded-full group-hover:bg-[#ff4500]/20 transition-colors" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#ff4500] blur-xl opacity-40 animate-pulse rounded-full" />
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-4 border-[#ff4500] flex items-center justify-center relative z-10 shadow-2xl">
                                        <Flame size={48} className="text-[#ff4500]" fill="currentColor" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Active Streak</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-7xl font-black text-white tracking-tighter">{streakData.currentStreak}</span>
                                        <span className="text-xl text-[#ff4500] font-bold">Days</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2 mb-1"><Target size={14} /> Best Streak</p>
                                    <p className="text-2xl font-bold">{streakData.bestStreak} Days</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2 mb-1"><Activity size={14} /> Total Workouts</p>
                                    <p className="text-2xl font-bold">{streakData.totalWorkouts}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Weekly Progress */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#141414] rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Calendar className="text-[#ff4500]" size={20} /> This Week</h3>
                            <button className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">History</button>
                        </div>

                        <div className="flex justify-between items-end h-full w-full">
                            {streakData.recentActivity.map((day, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 relative">
                                    {/* Tooltip on hover could go here */}
                                    <div className={`w-8 h-12 rounded-full flex items-end p-1 transition-all ${day.completed ? 'bg-[#ff4500]/20' : 'bg-gray-800/50'} ${day.isToday && !day.completed ? 'border border-[#ff4500] shadow-[0_0_10px_rgba(255,69,0,0.3)] animate-pulse' : ''}`}>
                                        <div className={`w-full rounded-full transition-all duration-1000 ${day.completed ? 'bg-[#ff4500] h-full shadow-[0_0_10px_rgba(255,69,0,0.5)]' : 'bg-transparent h-0'}`} />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase ${day.isToday ? 'text-[#ff4500]' : 'text-gray-500'}`}>{day.day}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Badges / Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black italic tracking-tighter">Your <span className="text-[#ff4500]">Milestones</span></h2>
                        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white font-bold transition-colors">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: 'First Drop', desc: 'Complete 1 Workout', icon: <Zap size={24} />, unlocked: true },
                            { title: 'Consistency', desc: '10 Day Streak', icon: <Flame size={24} />, unlocked: true },
                            { title: 'Iron Will', desc: '100 Total Workouts', icon: <Trophy size={24} />, unlocked: true },
                            { title: 'The Beast', desc: '50 Day Streak', icon: <Award size={24} />, unlocked: false },
                        ].map((badge, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl border transition-all flex flex-col items-center text-center ${badge.unlocked ? 'bg-[#ff4500]/5 border-[#ff4500]/30 hover:bg-[#ff4500]/10 hover:border-[#ff4500]' : 'bg-[#141414] border-white/5 opacity-50 grayscale'}`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${badge.unlocked ? 'bg-gradient-to-br from-[#ff4500] to-orange-600 text-white shadow-[0_0_20px_rgba(255,69,0,0.4)]' : 'bg-gray-800 text-gray-500'}`}>
                                    {badge.icon}
                                </div>
                                <h4 className="font-bold text-lg mb-1">{badge.title}</h4>
                                <p className="text-xs text-gray-400 font-medium">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default StreakDashboard;
