import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative min-h-screen w-full font-sans bg-[#070b14] flex items-center justify-center overflow-hidden selection:bg-[#ff4500] selection:text-white">

            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#00E5FF]/20 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-[#ff4500]/20 blur-[150px] rounded-full pointer-events-none" />

            {/* Grid Overlay Texture (Cyberpunk feel) */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMG0wIDYwaC02MCIvPjwvZz48L3N2Zz4=')] pointer-events-none z-0 opacity-40" />

            <div className="relative z-10 w-full max-w-[1000px] flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 mx-6 bg-[#0B1320]/80 backdrop-blur-2xl">

                {/* Left Side: Branding / Marketing */}
                <div className="hidden md:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-gradient-to-br from-[#111827]/80 to-[#070b14]/90 border-r border-white/5">
                    {/* Ambient glow inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4500]/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <Shield className="text-[#00E5FF]" size={36} />
                            <span className="text-3xl font-black tracking-tighter text-white">FairPlay.</span>
                        </div>

                        <h2 className="text-4xl font-black text-white leading-tight mb-6">
                            Human-Centric <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#ff4500]">Digital Framework</span>
                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-12">
                            A meritocratic player selection system. Track live biofeedback, measure true performance metrics, and unlock the digital twin of your athletes.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="flex -space-x-4 mb-4">
                            <img className="w-10 h-10 rounded-full border-2 border-[#111827] z-30" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="User 1" />
                            <img className="w-10 h-10 rounded-full border-2 border-[#111827] z-20" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User 2" />
                            <img className="w-10 h-10 rounded-full border-2 border-[#111827] z-10" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" alt="User 3" />
                            <div className="w-10 h-10 rounded-full border-2 border-[#111827] bg-[#ff4500] text-white flex items-center justify-center text-xs font-bold z-0">+2k</div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Join over 2,000+ athletes already on the platform.</p>
                    </div>
                </div>

                {/* Right Side: Form View */}
                <div className="w-full md:w-1/2 p-10 md:p-14 relative flex flex-col justify-center">

                    <div className="absolute top-8 right-10">
                        <div className="flex items-center bg-[#111827] rounded-full p-1 border border-white/10">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${isLogin ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${!isLogin ? 'bg-[#ff4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 sm:mt-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {isLogin ? 'Welcome Back' : 'Create Account'}
                                </h3>
                                <p className="text-gray-400 text-sm mb-10">
                                    {isLogin ? 'Enter your credentials to access your dashboard.' : 'Start your meritocratic journey today.'}
                                </p>

                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (onLogin) onLogin(); }}>

                                    {!isLogin && (
                                        <div className="group">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User size={18} className="text-gray-500 group-focus-within:text-[#00E5FF] transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Alex Mercer"
                                                    className="w-full bg-[#111827] border border-gray-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#00E5FF] focus:bg-[#070b14] transition-all shadow-inner"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="group">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail size={18} className="text-gray-500 group-focus-within:text-[#00E5FF] transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="alex@fairplay.com"
                                                className="w-full bg-[#111827] border border-gray-700 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#00E5FF] focus:bg-[#070b14] transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between mb-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                            {isLogin && <a href="#" className="text-xs font-bold text-[#00E5FF] hover:text-[#fff] transition-colors">Forgot?</a>}
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock size={18} className="text-gray-500 group-focus-within:text-[#00E5FF] transition-colors" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                className="w-full bg-[#111827] border border-gray-700 text-white rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-[#00E5FF] focus:bg-[#070b14] transition-all shadow-inner"
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

                                    <button className="w-full mt-8 bg-gradient-to-r from-[#00E5FF] to-blue-600 hover:from-[#00E5FF] hover:to-blue-500 text-white py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 group shadow-[0_10px_25px_rgba(0,229,255,0.3)] transition-all">
                                        {isLogin ? 'Sign In Securely' : 'Complete Registration'}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="mt-8 text-center px-4">
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            By continuing, you agree to FairPlay's <a href="#" className="text-gray-400 underline hover:text-white">Terms of Service</a> & <a href="#" className="text-gray-400 underline hover:text-white">Privacy Policy</a>
                                        </p>
                                    </div>

                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;
