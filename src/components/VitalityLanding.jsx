import React from 'react';
import { Play, ArrowRight, CheckCircle2, ChevronDown, Plus, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, MoveRight } from 'lucide-react';

const VitalityLanding = ({ onLoginClick }) => {
    return (
        <div className="bg-[#1a1a1a] text-white font-sans selection:bg-[#ff4500] selection:text-white">

            {/* 1. Header & Hero Section */}
            <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Gym Background"
                        className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]" />
                </div>

                {/* Navbar */}
                <nav className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-4 md:px-8 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1 text-[#ff4500]">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff4500]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff4500]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff4500]" />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter">Vitality</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <a href="#" className="text-[#ff4500]">Home</a>
                        <a href="#" className="hover:text-white transition-colors">About Us</a>
                        <a href="#" className="hover:text-white transition-colors">Classes</a>
                        <a href="#" className="hover:text-white transition-colors">News</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:block text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Call For Inquiry</p>
                            <p className="font-bold text-[#ff4500]">+1 800 123 4567</p>
                        </div>
                        <button onClick={onLoginClick} className="bg-white text-black px-6 py-2.5 rounded text-sm font-bold hover:bg-[#ff4500] hover:text-white transition-colors">
                            GET STARTED
                        </button>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center px-4 md:px-8 pb-32">
                    <div className="max-w-3xl">
                        <h4 className="flex items-center gap-2 text-[#ff4500] font-bold text-sm tracking-[0.2em] mb-4 uppercase">
                            <span className="w-8 h-[2px] bg-[#ff4500]"></span> Keep Your Body Fit
                        </h4>
                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 drop-shadow-2xl">
                            FIT TO <span className="text-[#ff4500]">KEEP</span><br />YOUR SKIN
                        </h1>
                        <p className="text-gray-300 max-w-xl text-lg mb-8 leading-relaxed">
                            We are a professional gym center making a unique approach for fitness and bodybuilding. Get started to make your body fit.
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            <button onClick={onLoginClick} className="bg-[#ff4500] text-white px-8 py-4 rounded font-bold tracking-wider hover:bg-orange-600 transition-colors shadow-[0_10px_30px_rgba(255,69,0,0.3)]">
                                JOIN US NOW
                            </button>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-[#ff4500] transition-colors relative">
                                    <Play size={20} fill="currentColor" className="ml-1 text-white group-hover:text-[#ff4500] transition-colors" />
                                    <div className="absolute inset-0 rounded-full animate-ping bg-[#ff4500]/20 pointer-events-none" />
                                </div>
                                <span className="font-bold text-sm tracking-widest uppercase">Watch Video</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Experience & Accordion Section */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative bg-[#1a1a1a]">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left two stacked images */}
                            <div className="space-y-4 pt-12">
                                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" className="rounded-xl w-full h-48 object-cover" alt="Workout" />
                                <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" className="rounded-xl w-full h-64 object-cover" alt="Workout" />
                            </div>
                            {/* Right large image */}
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" className="rounded-xl w-full h-[450px] object-cover" alt="Workout" />
                                {/* Badge */}
                                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#ff4500] rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl z-10 rotating-badge">
                                    <span className="text-3xl font-black leading-none">25+</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Years<br />Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center gap-2 mb-3">
                                <span className="w-6 h-[2px] bg-[#ff4500]"></span> Why Choose Us
                            </h4>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                We Have a <span className="text-[#ff4500]">Great Deal</span> of<br />Experience With Fitness
                            </h2>
                            <p className="text-gray-400">
                                Gym equipment is primarily used to measure the effort necessary to lift or move weight. We have experienced trainers who will guide you to reach your goals.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {['All Aerobics Works and Programs', 'Bodybuilding Training class', 'Healthy Fitness and Workout Plans'].map((item, idx) => (
                                <div key={idx} className={`border border-white/10 rounded-lg p-5 flex justify-between items-center cursor-pointer transition-colors ${idx === 0 ? 'bg-[#252525] border-white/20' : 'hover:bg-[#252525]'}`}>
                                    <span className={`font-bold ${idx === 0 ? 'text-[#ff4500]' : 'text-white'}`}>{item}</span>
                                    <ChevronDown size={20} className={idx === 0 ? 'text-[#ff4500] rotate-180' : 'text-gray-500'} />
                                </div>
                            ))}
                        </div>

                        <button className="border-2 border-white/20 hover:border-[#ff4500] text-white px-8 py-3 rounded font-bold uppercase tracking-widest hover:text-[#ff4500] transition-colors">
                            Read More
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Simple Steps to Reach Objectives */}
            <section className="py-24 px-4 bg-[#141414]">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 mb-3">
                        <span className="w-6 h-[2px] bg-[#ff4500]"></span> Process
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-black">
                        Simple Steps To <span className="text-[#ff4500]">Reach</span><br />Your Objectives.
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Exercise Movement", desc: "A key part of reaching goals is taking steps. We make it easy with our trainers.", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" },
                        { title: "Fitness Analysis", desc: "We analyze your body to provide the best workout plans tailored for you.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" },
                        { title: "Success", desc: "We ensure you reach your goals quickly safely, giving you maximum results.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" }
                    ].map((step, idx) => (
                        <div key={idx} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 group hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-8 text-center relative z-20">
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-white/10">{step.desc}</p>
                                <button className="text-[#ff4500] font-bold tracking-widest text-sm uppercase hover:text-white transition-colors">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Classes Outline */}
            <section className="py-24 px-4 bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 mb-3">
                            <span className="w-6 h-[2px] bg-[#ff4500]"></span> Fitness Classes Outline
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-black">
                            Our <span className="text-[#ff4500]">Fitness</span> Classes in<br />the gym
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2 relative">
                            <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop" alt="Classes" className="rounded-xl w-full h-[500px] object-cover" />
                            {/* Hover Card */}
                            <div className="absolute bottom-8 left-8 right-8 bg-[#1a1a1a]/95 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl">
                                <h3 className="text-2xl font-black mb-3">Aerobics and Gym class</h3>
                                <p className="text-gray-400 text-sm mb-6">Experience intense cardiovascular and strength training. Perfect for burning calories and building endurance.</p>
                                <button className="bg-[#ff4500] text-white px-6 py-2.5 rounded font-bold hover:bg-white hover:text-black transition-colors shadow">Join Class</button>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="flex flex-col h-full border-l border-white/10 pl-8 space-y-2">
                                {['Workout & Exercises', 'Individual Instruction', 'Healthy Nutrition', 'Weight Conditioning', 'Flexibility & Yoga', 'Physique Workout', 'Cardio Training'].map((item, id) => (
                                    <div key={id} className={`flex items-center gap-4 py-4 cursor-pointer group ${id === 0 ? 'text-[#ff4500]' : 'text-gray-400 hover:text-white'}`}>
                                        <div className={`w-10 h-10 rounded shadow flex items-center justify-center ${id === 0 ? 'bg-[#ff4500]/20 text-[#ff4500]' : 'bg-[#252525] text-gray-400 group-hover:bg-[#ff4500]/20 group-hover:text-[#ff4500]'}`}>
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className={`text-xl font-bold ${id === 0 ? '' : 'transition-colors'}`}>{item}</span>
                                    </div>
                                ))}
                                <div className="pt-4">
                                    <button className="text-[#ff4500] font-bold text-sm flex items-center gap-2 hover:text-white transition-colors">
                                        View All Classes <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Schedule Table */}
            <section className="py-24 px-4 bg-[#141414] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 mb-3">
                            <span className="w-6 h-[2px] bg-[#ff4500]"></span> Daily Routine
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-black">
                            Training <span className="text-[#ff4500]">Classes</span> Schedule
                        </h2>
                    </div>

                    <div className="overflow-x-auto pb-8">
                        <table className="w-full text-center border-collapse min-w-[800px]">
                            <thead>
                                <tr>
                                    {['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                                        <th key={i} className={`p-5 uppercase font-black tracking-widest text-sm ${i === 0 ? 'bg-[#252525] text-[#ff4500]' : 'bg-[#ff4500] text-white border-l border-[#e63e00]'}`}>{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                {/* Row 1 */}
                                <tr>
                                    <td className="bg-[#252525] p-5 border border-white/5 text-gray-400">08:00 AM</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Cardio Class</p>
                                        <p className="text-xs text-gray-500 mt-1">John Doe</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">CrossFit Level</p>
                                        <p className="text-xs text-gray-500 mt-1">Alex Max</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Power Lifting</p>
                                        <p className="text-xs text-gray-500 mt-1">Steve</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Body Building</p>
                                        <p className="text-xs text-gray-500 mt-1">Ryan</p>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr>
                                    <td className="bg-[#252525] p-5 border border-white/5 text-gray-400">10:00 AM</td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Yoga Classes</p>
                                        <p className="text-xs text-gray-500 mt-1">Emma</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Aerobics</p>
                                        <p className="text-xs text-gray-500 mt-1">Sarah</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Gymnastics</p>
                                        <p className="text-xs text-gray-500 mt-1">Chris</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                </tr>
                                {/* Row 3 - Highlighted */}
                                <tr>
                                    <td className="bg-[#252525] p-5 border border-white/5 text-gray-400">04:00 PM</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Body Building</p>
                                        <p className="text-xs text-gray-500 mt-1">Ryan</p>
                                    </td>
                                    <td className="bg-[#ff4500] border border-[#ff4500] p-4 cursor-pointer text-white relative shadow-[0_0_20px_rgba(255,69,0,0.5)] z-10 scale-105 rounded">
                                        <p className="font-bold">Cardio Class</p>
                                        <p className="text-xs text-white/80 mt-1">John Doe</p>
                                    </td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">CrossFit Level</p>
                                        <p className="text-xs text-gray-500 mt-1">Alex Max</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Power Lifting</p>
                                        <p className="text-xs text-gray-500 mt-1">Steve</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                </tr>
                                {/* Row 4 */}
                                <tr>
                                    <td className="bg-[#252525] p-5 border border-white/5 text-gray-400">06:00 PM</td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Aerobics</p>
                                        <p className="text-xs text-gray-500 mt-1">Sarah</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Yoga Classes</p>
                                        <p className="text-xs text-gray-500 mt-1">Emma</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                    <td className="border border-white/5 p-4 hover:bg-[#ff4500]/10 cursor-pointer transition-colors group">
                                        <p className="font-bold text-white group-hover:text-[#ff4500]">Cardio Class</p>
                                        <p className="text-xs text-gray-500 mt-1">John Doe</p>
                                    </td>
                                    <td className="bg-[#1a1a1a] border border-white/5">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 6. Pricing */}
            <section className="py-24 px-4 bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 mb-3">
                            <span className="w-6 h-[2px] bg-[#ff4500]"></span> Pricing Plans
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-black">
                            Find Your <span className="text-[#ff4500]">Perfect</span> Plan
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Plan 1 */}
                        <div className="bg-[#252525] p-10 rounded-xl border border-white/5 hover:border-[#ff4500]/50 transition-colors flex flex-col clip-path-slant relative top-4">
                            <h3 className="text-2xl font-black mb-2">Essential Plan</h3>
                            <div className="flex items-end gap-1 text-[#ff4500] font-black mb-8">
                                <span className="text-4xl">$50</span>
                                <span className="text-sm text-gray-400 font-medium pb-1">/ month</span>
                            </div>
                            <div className="space-y-4 mb-10 flex-1">
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> 2 Classes / week</p>
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> Access to Locker Room</p>
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> Free Water</p>
                            </div>
                            <button onClick={onLoginClick} className="w-full border border-[#ff4500] text-[#ff4500] py-3 rounded font-bold hover:bg-[#ff4500] hover:text-white transition-colors">Join Now</button>
                        </div>

                        {/* Plan 2 - Middle (Highlighted) */}
                        <div className="bg-[#ff4500] p-10 rounded-xl border-none shadow-[0_20px_40px_rgba(255,69,0,0.3)] flex flex-col clip-path-slant relative z-10 bottom-4 scale-105">
                            {/* Removed Most Popular Badge */}
                            <h3 className="text-2xl font-black mb-2 mt-4 text-white">Premium Plan</h3>
                            <div className="flex items-end gap-1 text-white font-black mb-8">
                                <span className="text-5xl">$100</span>
                                <span className="text-sm font-medium pb-1 opacity-80">/ month</span>
                            </div>
                            <div className="space-y-4 mb-10 flex-1">
                                <p className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={18} className="text-white" /> 5 Classes / week</p>
                                <p className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={18} className="text-white" /> Access to Locker Room & Sauna</p>
                                <p className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={18} className="text-white" /> Free Nutrition Guide</p>
                                <p className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={18} className="text-white" /> 1 Personal Training Session</p>
                            </div>
                            <button onClick={onLoginClick} className="w-full bg-white text-[#ff4500] py-3 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg">Join Now</button>
                        </div>

                        {/* Plan 3 */}
                        <div className="bg-[#252525] p-10 rounded-xl border border-white/5 hover:border-[#ff4500]/50 transition-colors flex flex-col clip-path-slant relative top-4">
                            <h3 className="text-2xl font-black mb-2">Pro Plan</h3>
                            <div className="flex items-end gap-1 text-[#ff4500] font-black mb-8">
                                <span className="text-4xl">$150</span>
                                <span className="text-sm text-gray-400 font-medium pb-1">/ month</span>
                            </div>
                            <div className="space-y-4 mb-10 flex-1">
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> Unlimited Classes</p>
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> Full Facilities Access</p>
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> Custom Diet Plan</p>
                                <p className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle2 size={18} className="text-[#ff4500]" /> Weekly Personal Training</p>
                            </div>
                            <button onClick={onLoginClick} className="w-full border border-[#ff4500] text-[#ff4500] py-3 rounded font-bold hover:bg-[#ff4500] hover:text-white transition-colors">Join Now</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Banner / Promo Section */}
            <section className="py-16 px-4 bg-[#141414]">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl border border-white/5 p-8 relative">
                    <div className="w-full md:w-1/2 relative h-[400px]">
                        {/* Collage of images */}
                        <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" className="absolute left-0 top-0 w-3/4 h-64 object-cover rounded-xl shadow-lg border-4 border-[#1a1a1a] z-10" />
                        <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" className="absolute right-0 bottom-0 w-3/4 h-64 object-cover rounded-xl shadow-lg border-4 border-[#1a1a1a] z-20" />
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                            <span className="w-6 h-[2px] bg-[#ff4500]"></span> Special Promo
                        </h4>
                        <h2 className="text-4xl font-black leading-tight">
                            Energizing <span className="text-[#ff4500]">Exercise</span> Program<br />for Both <span className="text-[#ff4500]">Body</span> and Mind
                        </h2>
                        <p className="text-gray-400">
                            Join our specialized 8-week program designed to revitalize your routine. We focus on holistic health including mental wellness, physical conditioning, and nutritional balance to maximize your potential.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 size={16} className="text-[#ff4500]" /> Full Body Workouts</div>
                            <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 size={16} className="text-[#ff4500]" /> Dedicated Nutritionist</div>
                            <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 size={16} className="text-[#ff4500]" /> Mental Health Guides</div>
                            <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 size={16} className="text-[#ff4500]" /> 24x7 App Access</div>
                        </div>

                        <div className="pt-4">
                            <button className="bg-[#ff4500] text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-black transition-colors">Start Program</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Meet Our Trainers */}
            <section className="py-24 px-4 bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h4 className="text-[#ff4500] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 mb-3">
                            <span className="w-6 h-[2px] bg-[#ff4500]"></span> Expert Team
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-black">
                            Meet Our <span className="text-[#ff4500]">Proficient</span> Trainers
                        </h2>
                    </div>

                    <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
                        {/* Trainer 1 */}
                        <div className="text-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#ff4500] transition-colors mb-4 mx-auto relative cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1567598508481-65985588e295?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Trainer" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Thomas Hale</h3>
                            <p className="text-[#ff4500] text-sm uppercase tracking-widest font-bold">Crossfit Coach</p>
                            <div className="flex justify-center gap-3 mt-4 text-gray-400">
                                <Facebook size={16} className="hover:text-white cursor-pointer" />
                                <Twitter size={16} className="hover:text-white cursor-pointer" />
                                <Instagram size={16} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>

                        {/* Trainer 2 */}
                        <div className="text-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#ff4500] transition-colors mb-4 mx-auto relative cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Trainer" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Evelyn Jane</h3>
                            <p className="text-[#ff4500] text-sm uppercase tracking-widest font-bold">Yoga Expert</p>
                            <div className="flex justify-center gap-3 mt-4 text-gray-400">
                                <Facebook size={16} className="hover:text-white cursor-pointer" />
                                <Twitter size={16} className="hover:text-white cursor-pointer" />
                                <Instagram size={16} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>

                        {/* Central Add Button (Decorative or Action) */}
                        <div className="flex items-center justify-center transform lg:-translate-y-12 shrink-0">
                            <button className="w-24 h-24 rounded-full bg-[#ff4500] text-white flex items-center justify-center hover:scale-110 shadow-[0_0_30px_rgba(255,69,0,0.5)] transition-all">
                                <Plus size={40} />
                            </button>
                        </div>

                        {/* Trainer 3 */}
                        <div className="text-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#ff4500] transition-colors mb-4 mx-auto relative cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Trainer" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Mark Doe</h3>
                            <p className="text-[#ff4500] text-sm uppercase tracking-widest font-bold">Bodybuilder</p>
                            <div className="flex justify-center gap-3 mt-4 text-gray-400">
                                <Facebook size={16} className="hover:text-white cursor-pointer" />
                                <Twitter size={16} className="hover:text-white cursor-pointer" />
                                <Instagram size={16} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>

                        {/* Trainer 4 */}
                        <div className="text-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#ff4500] transition-colors mb-4 mx-auto relative cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Trainer" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Sarah Ali</h3>
                            <p className="text-[#ff4500] text-sm uppercase tracking-widest font-bold">Fitness Coach</p>
                            <div className="flex justify-center gap-3 mt-4 text-gray-400">
                                <Facebook size={16} className="hover:text-white cursor-pointer" />
                                <Twitter size={16} className="hover:text-white cursor-pointer" />
                                <Instagram size={16} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Footer & Newsletter */}
            <footer className="bg-[#111111] border-t border-white/10 pt-24 pb-8 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">

                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1 text-[#ff4500]">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff4500]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff4500]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff4500]" />
                            </div>
                            <span className="text-2xl font-bold tracking-tighter">Vitality</span>
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            We are dedicated to helping you achieve your fitness goals with state-of-the-art facilities and expert guidance. Join our community today.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#ff4500] transition-colors cursor-pointer"><Facebook size={18} /></div>
                            <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#ff4500] transition-colors cursor-pointer"><Twitter size={18} /></div>
                            <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#ff4500] transition-colors cursor-pointer"><Instagram size={18} /></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400 font-medium">
                            <li><a href="#" className="hover:text-[#ff4500] transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-[#ff4500] transition-colors">Our Classes</a></li>
                            <li><a href="#" className="hover:text-[#ff4500] transition-colors">Pricing Plans</a></li>
                            <li><a href="#" className="hover:text-[#ff4500] transition-colors">Latest News</a></li>
                            <li><a href="#" className="hover:text-[#ff4500] transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter for latest updates and offers.</p>
                        <div className="flex items-center bg-[#252525] rounded p-1 border border-white/5 focus-within:border-[#ff4500] transition-colors">
                            <input type="email" placeholder="Email Address" className="bg-transparent text-white px-4 py-3 outline-none w-full text-sm" />
                            <button className="bg-[#ff4500] text-white px-4 py-3 rounded hover:bg-white hover:text-black transition-colors">
                                <MoveRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center text-sm text-gray-500 font-medium flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Vitality Gym. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VitalityLanding;
