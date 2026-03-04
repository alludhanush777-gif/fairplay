import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Brain, Volume2, X, ChevronRight, Activity, Shield, Layout, UserPlus, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import usePlayerStore, { speakAlert } from '../store/playerStore';

const OPENAI_API_KEY = '';

export default function AICoach() {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState('');

    const recognitionRef = useRef(null);
    const scrollRef = useRef(null);

    // Sync scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isProcessing]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.onresult = (e) => handleVoiceCommand(e.results[0][0].transcript);
            recognitionRef.current.onerror = (e) => {
                setIsListening(false);
                setError('Mic error: ' + e.error);
                setTimeout(() => setError(''), 3000);
            };
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const toggleListen = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setError('');
            recognitionRef.current?.start();
            setIsListening(true);
            setShowSidebar(true);
        }
    };

    const addChatMessage = (role, content) => {
        setChatHistory(prev => [...prev, { role, content, time: new Date().toLocaleTimeString() }]);
    };

    const executeAction = (action, data) => {
        const store = usePlayerStore.getState();
        switch (action) {
            case 'CHANGE_VIEW':
                store.setView(data.view.toLowerCase());
                return `Switching dashboard to ${data.view} view.`;
            case 'ADD_PLAYER':
                const id = `#${Math.floor(1000 + Math.random() * 9000)}`;
                store.addPlayer({ ...data, id, o2: 95, topSpeed: 25, agility: 70 });
                return `Successfully initialized ${data.name} to the roster.`;
            case 'SELECT_PLAYER':
                store.setSelectedPlayerId(data.playerId);
                return `Selecting subject ${data.playerId}.`;
            case 'UPDATE_METRIC':
                store.updatePlayerMetrics(data.playerId, { [data.metric]: data.value });
                return `Updated ${data.metric} to ${data.value}.`;
            case 'HIGHLIGHT_PART':
                store.setHighlightedPart(data.part);
                setTimeout(() => store.setHighlightedPart(null), 5000);
                return `Highlighting ${data.part} on the digital twin.`;
            default: return null;
        }
    };

    const handleVoiceCommand = async (text) => {
        setIsProcessing(true);
        addChatMessage('user', text);

        const store = usePlayerStore.getState();
        const roster = store.players;
        const selectedPlayer = roster.find(p => p.id === store.selectedPlayerId) || roster[0];

        if (OPENAI_API_KEY) {
            try {
                const rosterContext = roster.map(p =>
                    `Subject ID: ${p.id}, Name: ${p.name}, HR: ${p.hr}, Recovery: ${p.recovery}%, Agility: ${p.agility}/100, Speed: ${p.topSpeed}km/h`
                ).join('\n');

                const systemPrompt = `
You are the FairPlay Master Intelligence. You are the nervous system of the FairPlay platform.
KNOWLEDGE BASE:
- PURPOSE: FairPlay is a high-performance Command Center for athlete analytics.
- ROSTER DATA:
${rosterContext}

INSTRUCTIONS:
- If an ID is provided (e.g., #0001), retrieve the exact subject data immediately.
- For ability analysis, summarize 'Agility', 'Balance', and 'Speed' (e.g., "Subject #0001 is an Agility specialist").
- Be a high-level sports scientist. Use terms like 'biometric efficiency' and 'neural readiness'.

REACTION TOOLS (JSON ONLY):
{"action": "CHANGE_VIEW", "data": {"view": "admin" | "viewer" | "streak"}}
{"action": "SELECT_PLAYER", "data": {"playerId": "#0001"}}
{"action": "HIGHLIGHT_PART", "data": {"part": "chest" | "legs"}}

If a command is detected, output the JSON block and a short confirmation.
`;
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
                    body: JSON.stringify({
                        model: 'gpt-4o',
                        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: text }]
                    })
                });
                const data = await response.json();
                let aiMsg = data.choices[0].message.content;
                const jsonMatch = aiMsg.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const cmd = JSON.parse(jsonMatch[0]);
                    executeAction(cmd.action, cmd.data);
                    aiMsg = aiMsg.replace(jsonMatch[0], '').trim();
                }
                addChatMessage('ai', aiMsg);
                speakAlert(aiMsg);
            } catch (e) {
                addChatMessage('ai', "Master link disrupted. Please check API key.");
            }
        } else {
            // MOCK LOGIC (Upgraded for Data Awareness)
            let response = "I am the FairPlay Intelligence. Ask me for data on a specific ID (e.g., #0001), change views, or probe the 3D model.";
            let lower = text.toLowerCase();

            // Search for Player ID in text
            const idMatch = text.match(/#\d{4}/);
            const foundPlayer = idMatch ? roster.find(p => p.id === idMatch[0]) : null;

            if (foundPlayer) {
                const abilityFocus = foundPlayer.agility > 80 ? "an Agility-focused specialist" : "a balanced physical subject";
                response = `Retrieving Subject ${foundPlayer.id} (${foundPlayer.name}). 
                           Current Abilities: ${abilityFocus} with a Top Speed of ${foundPlayer.topSpeed}km/h and ${foundPlayer.agility}/100 Agility rating.
                           Biometric Status: Heart rate is stable at ${foundPlayer.hr} BPM, and Recovery is at ${foundPlayer.recovery}%. 
                           I have initialized the digital twin for subject ${foundPlayer.name}.`;
                executeAction('SELECT_PLAYER', { playerId: foundPlayer.id });
            } else if (lower.includes('heart rate') || lower.includes('hr')) {
                const num = lower.match(/\d+/);
                if (num) {
                    executeAction('UPDATE_METRIC', { playerId: selectedPlayer.id, metric: 'hr', value: parseInt(num[0]) });
                    response = `Synchronizing ${selectedPlayer.name}'s biometric heart rate to ${num[0]} bpm. Neural readiness adjusted.`;
                }
            } else if (lower.includes('dash') || lower.includes('streak') || lower.includes('view') || lower.includes('admin')) {
                let target = lower.includes('streak') ? 'streak' : lower.includes('admin') ? 'admin' : 'viewer';
                executeAction('CHANGE_VIEW', { view: target });
                response = `Reconfiguring interface to ${target} module. Link established.`;
            } else if (lower.includes('highlight') || lower.includes('show')) {
                let part = lower.includes('chest') || lower.includes('heart') ? 'chest' : 'legs';
                executeAction('HIGHLIGHT_PART', { part });
                response = `Probing ${part} data nodes on digital twin. Visualizing biometric sensors now.`;
            }

            setTimeout(() => {
                addChatMessage('ai', response);
                speakAlert(response);
                setIsProcessing(false);
            }, 800);
            return;
        }
        setIsProcessing(false);
    };

    return (
        <>
            {/* Activation Button */}
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
                <AnimatePresence>
                    {(isListening || isProcessing) && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-[#00F0FF]/10 backdrop-blur-md border border-[#00F0FF]/30 px-4 py-2 rounded-full mb-2 flex items-center gap-2">
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-[#00F0FF]" />
                            <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-[#00F0FF]" />
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-[#00F0FF]" />
                            <span className="text-[10px] text-[#00F0FF] font-black tracking-widest uppercase">Syncing...</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button onClick={toggleListen} onContextMenu={(e) => { e.preventDefault(); setShowSidebar(!showSidebar); }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-500 relative
                        ${isListening ? 'bg-[#FF4D00] shadow-[0_0_40px_rgba(255,77,0,0.5)] scale-110' : 'bg-[#0A0F1E] border border-[#00F0FF]/30 hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]'}`}>
                    <AnimatePresence mode="wait">
                        {isListening ? <MicOff key="off" className="text-white" size={28} /> : <Brain key="on" className="text-[#00F0FF]" size={28} />}
                    </AnimatePresence>
                    {isListening && <motion.div layoutId="flare" className="absolute inset-0 rounded-full border-2 border-white/50" animate={{ scale: [1, 1.4], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} />}
                </button>
            </div>

            {/* Master Intelligence Sidebar */}
            <AnimatePresence>
                {showSidebar && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSidebar(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] pointer-events-auto" />

                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-[#070B14]/90 backdrop-blur-2xl border-l border-white/10 z-[80] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto">

                            {/* Header */}
                            <div className="p-6 border-b border-white/10 bg-slate-950/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/30">
                                        <Brain className="text-[#00F0FF]" size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-white font-bold tracking-tighter text-lg leading-none">MASTER <span className="text-[#00F0FF]">INTEL</span></h2>
                                        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Platform Link Active
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setShowSidebar(false)} className="text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                                {chatHistory.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                        <Database size={48} className="text-[#00F0FF]" />
                                        <p className="text-xs max-w-[200px] leading-relaxed">System ready. Command me to analyze biometrics, reconfigure views, or initialize roster players.</p>
                                    </div>
                                ) : (
                                    chatHistory.map((msg, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-[#FF4D00] text-white rounded-tr-none shadow-[0_10px_20px_rgba(255,77,0,0.2)]'
                                                : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                            <span className="text-[9px] text-gray-600 mt-2 font-mono">{msg.time}</span>
                                        </motion.div>
                                    ))
                                )}

                                {isProcessing && (
                                    <div className="flex items-center gap-1 px-4 py-3 bg-white/5 rounded-2xl w-fit">
                                        <span className="w-1 h-1 bg-[#00F0FF] rounded-full animate-bounce" />
                                        <span className="w-1 h-1 bg-[#00F0FF] rounded-full animate-bounce delay-75" />
                                        <span className="w-1 h-1 bg-[#00F0FF] rounded-full animate-bounce delay-150" />
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="px-6 py-4 border-t border-white/10 bg-black/20 flex gap-2 overflow-x-auto scrollbar-hide">
                                <button onClick={() => handleVoiceCommand("Switch to Streak Dashboard")} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-gray-400 hover:text-white transition-all">
                                    <Layout size={12} /> STREAKS
                                </button>
                                <button onClick={() => handleVoiceCommand("Show me the Admin Panel")} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-gray-400 hover:text-white transition-all">
                                    <Shield size={12} /> ADMIN
                                </button>
                                <button onClick={() => handleVoiceCommand("Highlight the chest area")} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-gray-400 hover:text-white transition-all">
                                    <Activity size={12} /> PROBE CHEST
                                </button>
                            </div>

                            {/* Footer Input */}
                            <div className="p-6 bg-slate-950/80 border-t border-white/10">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Speak or type command..."
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 pr-12 text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all group-hover:border-white/20"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value) {
                                                handleVoiceCommand(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <button onClick={toggleListen} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-[#00F0FF] transition-colors">
                                        <Mic size={20} />
                                    </button>
                                </div>
                                <p className="text-[9px] text-center text-gray-600 mt-4 tracking-tighter uppercase font-mono">End-to-End Encrypted // Biometric Link Stable</p>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
