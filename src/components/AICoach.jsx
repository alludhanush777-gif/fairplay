import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Brain, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import usePlayerStore, { speakAlert } from '../store/playerStore';

// Note: In a real app, inject this via process.env.VITE_OPENAI_API_KEY
const OPENAI_API_KEY = '';

export default function AICoach() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const recognitionRef = useRef(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                handleVoiceCommand(text);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                setError('Microphone error: ' + event.error);
                setTimeout(() => setError(''), 3000);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        } else {
            console.warn("Speech recognition not supported in this browser.");
            setError('Speech recognition not supported.');
        }
    }, []); // Empty dependency array prevents recreation and infinite loops!

    const toggleListen = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setTranscript('');
            setError('');
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const addChatMessage = (role, content) => {
        setChatHistory(prev => [...prev, { role, content, time: new Date().toLocaleTimeString() }]);
    };

    const executeJSONCommand = (actionBlock) => {
        const store = usePlayerStore.getState();
        try {
            const cmd = JSON.parse(actionBlock);
            if (cmd.action === 'ADD_PLAYER' && cmd.data) {
                // generate random ID
                const id = `#${Math.floor(1000 + Math.random() * 9000)}`;
                store.addPlayer({ ...cmd.data, id, o2: 95, topSpeed: 0, agility: 50 });
                return true;
            } else if (cmd.action === 'UPDATE_METRIC' && cmd.data) {
                store.updatePlayerMetrics(cmd.data.playerId, { [cmd.data.metric]: cmd.data.value });
                return true;
            } else if (cmd.action === 'SELECT_PLAYER' && cmd.data) {
                store.setSelectedPlayerId(cmd.data.playerId);
                return true;
            } else if (cmd.action === 'HIGHLIGHT_BODY_PART' && cmd.data) {
                store.setHighlightedPart(cmd.data.part);
                setTimeout(() => store.setHighlightedPart(null), 5000);
                return true;
            }
        } catch (e) {
            console.error("Failed to parse AI command", e);
        }
        return false;
    };

    const handleVoiceCommand = async (text) => {
        setIsProcessing(true);
        addChatMessage('user', text);

        // Fetch the very latest state on demand
        const store = usePlayerStore.getState();
        const selectedPlayer = store.players.find(p => p.id === store.selectedPlayerId) || store.players[0];

        if (OPENAI_API_KEY) {
            // Real LLM Integration
            try {
                const systemPrompt = `
You are the FairPlay AI Coach, an expert sports scientist and assistant. Your personality is supportive, knowledgeable, and slightly enthusiastic.
You have access to the current dashboard state:
- Selected Player: ${selectedPlayer.name} (ID: ${selectedPlayer.id}) with metrics:
  - Heart Rate: ${selectedPlayer.hr} bpm
  - Recovery: ${selectedPlayer.recovery}%
  - Hydration: ${selectedPlayer.hydration}%
  - Balance: ${selectedPlayer.balance}%

You can perform actions by responding with ONLY a JSON block like:
{"action": "UPDATE_METRIC", "data": {"playerId": "${selectedPlayer.id}", "metric": "hr", "value": 140}}
or {"action": "HIGHLIGHT_BODY_PART", "data": {"part": "chest"}}

Answer conversationally if it's a question. If a command, output the JSON block and a conversational confirmation.
`;
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
                    body: JSON.stringify({
                        model: 'gpt-4o',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: text }
                        ]
                    })
                });
                const data = await response.json();
                const aiMsg = data.choices[0].message.content;

                // Extract JSON if present
                const jsonMatch = aiMsg.match(/\{[\s\S]*\}/);
                let spokenText = aiMsg;
                if (jsonMatch) {
                    executeJSONCommand(jsonMatch[0]);
                    spokenText = aiMsg.replace(jsonMatch[0], '').trim();
                }

                addChatMessage('ai', spokenText);
                speakAlert(spokenText);

            } catch (err) {
                console.error("API Error", err);
                addChatMessage('ai', "I'm having trouble connecting to the network right now.");
                speakAlert("I'm having trouble connecting to the network right now.");
            }
        } else {
            // Simulated Fallback Logic
            let response = "I couldn't understand that command.";
            let lowerText = text.toLowerCase();

            if (lowerText.includes('heart rate') || lowerText.includes('hr')) {
                // naive parsing for demo
                const num = lowerText.match(/\d+/);
                if (num) {
                    store.updatePlayerMetrics(selectedPlayer.id, { hr: parseInt(num[0]) });
                    response = `I have updated ${selectedPlayer.name}'s heart rate to ${num[0]} bpm.`;
                } else {
                    response = `${selectedPlayer.name}'s current heart rate is ${selectedPlayer.hr} bpm.`;
                }
            } else if (lowerText.includes('recovery')) {
                response = `${selectedPlayer.name}'s recovery is at ${selectedPlayer.recovery}%.`;
            } else if (lowerText.includes('highlight') || lowerText.includes('show me')) {
                if (lowerText.includes('chest') || lowerText.includes('heart')) {
                    store.setHighlightedPart('chest');
                    setTimeout(() => store.setHighlightedPart(null), 5000);
                    response = "Highlighting the chest area on the digital twin.";
                } else if (lowerText.includes('leg') || lowerText.includes('legs')) {
                    store.setHighlightedPart('legs');
                    setTimeout(() => store.setHighlightedPart(null), 5000);
                    response = "Highlighting the lower extremities.";
                }
            } else {
                response = "I heard you, but I need an API key to process complex queries. I can currently handle basic heart rate and highlight commands.";
            }

            // Simulate network delay
            setTimeout(() => {
                addChatMessage('ai', response);
                speakAlert(response);
                setIsProcessing(false);
            }, 1000);
            return; // exit early for fake delay
        }

        setIsProcessing(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

            {/* Optional Chat Panel */}
            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-80 h-96 bg-[#0B1320]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden"
                    >
                        <div className="bg-[#111827] p-3 border-b border-white/10 flex items-center gap-2">
                            <Brain className="text-[#00E5FF]" size={18} />
                            <h3 className="text-white text-sm font-bold tracking-widest">TWIN COACH</h3>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
                            {chatHistory.length === 0 ? (
                                <p className="text-gray-500 text-xs text-center m-auto">Try saying "What is the selected player's recovery?" or "Highlight the chest".</p>
                            ) : (
                                chatHistory.map((msg, i) => (
                                    <div key={i} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
                                        <div className={`px-3 py-2 rounded-xl text-sm ${msg.role === 'user'
                                            ? 'bg-[#FF4D00] text-white rounded-tr-sm'
                                            : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-sm'
                                            }`}>
                                            {msg.content}
                                        </div>
                                        <span className={`text-[10px] text-gray-600 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</span>
                                    </div>
                                ))
                            )}
                            {isProcessing && (
                                <div className="self-start px-3 py-2 rounded-xl bg-white/5 border border-white/5 flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            )}
                        </div>
                        {error && (
                            <div className="bg-red-500/20 text-red-400 text-xs p-2 text-center border-t border-red-500/30">
                                {error}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Control Button */}
            <div className="pointer-events-auto flex items-center gap-3">
                <AnimatePresence>
                    {(isListening || isProcessing) && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2"
                        >
                            <Volume2 className="text-[#00E5FF] animate-pulse" size={16} />
                            <span className="text-xs text-[#00E5FF] font-mono uppercase tracking-widest leading-none">
                                {isListening ? 'Listening...' : 'Processing...'}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative">
                    {/* Ripple Effect Background when listening */}
                    {isListening && (
                        <span className="absolute inset-0 bg-[#FF4D00] rounded-full animate-ping opacity-30"></span>
                    )}
                    <button
                        onClick={toggleListen}
                        onContextMenu={(e) => { e.preventDefault(); setShowChat(!showChat); }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-10 relative 
                            ${isListening ? 'bg-[#FF4D00] shadow-[0_0_30px_rgba(255,77,0,0.6)] scale-110' : 'bg-[#0B1320] border border-white/20 hover:border-[#00E5FF]/50 hover:bg-[#111827]'}`}
                        title="Click to speak. Right-click for chat log."
                    >
                        {isListening ? (
                            <MicOff className="text-white" size={24} />
                        ) : (
                            <Mic className="text-[#00E5FF]" size={24} />
                        )}
                    </button>
                    {/* Small avatar indicator */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00E5FF] rounded-full flex items-center justify-center border-2 border-black">
                        <Brain size={12} className="text-black" />
                    </div>
                </div>
            </div>

        </div>
    );
}
