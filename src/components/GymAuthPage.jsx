import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Dumbbell, ArrowRight, Eye, EyeOff } from 'lucide-react';

const GymAuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative min-h-screen w-full font-sans bg-[#1a1a1a] flex items-center justify-center overflow-hidden selection:bg-[#ff4500] selection:text-white">

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Gym Background"
                    className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity grayscale transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-[#1a1a1a]/50" />
            </div>

            <div className="relative z-10 w-full max-w-[1000px] flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden shadow-2xl mx-6 bg-[#141414]/90 backdrop-blur-xl border border-white/5">

                {/* Left Side: Branding / Marketing */}
                <div className="hidden md:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-[#ff4500]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-10 text-white">
                            <div className="flex gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            </div>
                            <span className="text-3xl font-black tracking-tighter">Vitality</span>
                        </div>

                        <h2 className="text-5xl font-black text-white leading-tight mb-6 italic tracking-tighter uppercase">
                            Sweat Now. <br />
                            Shine Later.
                        </h2>

                        <p className="text-white/80 font-medium leading-relaxed max-w-sm mb-12">
                            Join the ultimate fitness revolution. Transform your body, elevate your mind, and become the best version of yourself with our world-class trainers and facilities.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 text-white">
                            <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                <Dumbbell size={24} />
                            </div>
                            <div>
                                <p className="font-black text-xl">500+</p>
                                <p className="text-xs uppercase tracking-widest font-bold opacity-80">Active Members</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form View */}
                <div className="w-full md:w-1/2 p-10 md:p-14 relative flex flex-col justify-center">

                    <div className="absolute top-8 right-10">
                        <div className="flex items-center bg-[#252525] rounded-full p-1 border border-white/5">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`px-5 py-2 text-xs font-bold rounded-full transition-all uppercase tracking-widest ${isLogin ? 'bg-[#ff4500] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`px-5 py-2 text-xs font-bold rounded-full transition-all uppercase tracking-widest ${!isLogin ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 sm:mt-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tight">
                                    {isLogin ? 'Member Login' : 'Join Vitality'}
                                </h3>
                                <p className="text-gray-400 text-sm mb-10">
                                    {isLogin ? 'Access your fitness dashboard and class schedule.' : 'Take the first step towards a healthier you.'}
                                </p>

                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (onLogin) onLogin(); }}>

                                    {!isLogin && (
                                        <div className="group">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User size={20} className="text-gray-500 group-focus-within:text-[#ff4500] transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    required
                                                    className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded font-medium pl-12 pr-4 py-4 focus:outline-none focus:border-[#ff4500] transition-all"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="group">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail size={20} className="text-gray-500 group-focus-within:text-[#ff4500] transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded font-medium pl-12 pr-4 py-4 focus:outline-none focus:border-[#ff4500] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between mb-2 px-1">
                                            <span className="text-[10px] invisible"> Spacer </span>
                                            {isLogin && <a href="#" className="text-xs font-bold text-[#ff4500] hover:text-white transition-colors uppercase tracking-widest">Forgot Password?</a>}
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock size={20} className="text-gray-500 group-focus-within:text-[#ff4500] transition-colors" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Password"
                                                required
                                                className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded font-medium pl-12 pr-12 py-4 focus:outline-none focus:border-[#ff4500] transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button className="w-full mt-8 bg-[#ff4500] hover:bg-white hover:text-black text-white py-4 rounded font-black uppercase tracking-widest flex items-center justify-center gap-2 group transition-all">
                                        {isLogin ? 'Login to Dashboard' : 'Become a Member'}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>

                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GymAuthPage;
