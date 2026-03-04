import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Sphere, Cylinder, Html, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Activity, Droplets, Shield, HeartPulse, UserCircle2, Settings } from 'lucide-react';
import * as THREE from 'three';

// --- 3D Components ---

// Real-Time Reactions:
// - Heart Rate Pulse: frequency of pulsating glow around chest.
// - Recovery % Color: >=80% Cyan, 50-79% Orange, <50% Red.
// - Hydration: affects opacity/density of a water particle effect.
// - Balance: color of leg joints (green high, red low).
const StylizedHuman = ({ player }) => {
    const groupRef = useRef();
    const chestRef = useRef();
    const leftLegRef = useRef();
    const rightLegRef = useRef();

    // Derived colors and values
    const hrScale = player.hr / 60; // baseline 60bpm -> 1x pulse
    const recoveryColor = player.recovery >= 80 ? '#00F0FF' : player.recovery >= 50 ? '#FF4D00' : '#FF0000';
    const balanceColor = player.balance >= 70 ? '#00FF00' : player.balance >= 40 ? '#FFaa00' : '#FF0000';
    const hydrationOpacity = Math.max(0.1, player.hydration / 100);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Idle rotation or breathing motion
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
        }
        if (chestRef.current) {
            // Heartbeat scale pulse
            const pulse = 1 + Math.sin(state.clock.elapsedTime * hrScale * Math.PI) * 0.15;
            chestRef.current.scale.set(pulse, pulse, pulse);
            // Dynamic emissive intensity based on heartbeat
            if (chestRef.current.material) {
                chestRef.current.material.emissiveIntensity = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * hrScale * Math.PI)) * 1.5;
            }
        }
    });

    const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: recoveryColor,
        emissive: recoveryColor,
        emissiveIntensity: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    }), [recoveryColor]);

    const legMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: balanceColor,
        emissive: balanceColor,
        emissiveIntensity: 0.6,
        wireframe: true,
    }), [balanceColor]);

    return (
        <group ref={groupRef} position={[0, -1.5, 0]}>
            {/* Head */}
            <mesh position={[0, 3.2, 0]} material={bodyMaterial}>
                <sphereGeometry args={[0.35, 16, 16]} />
                <Html position={[0.5, 0.2, 0]} center className="pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] px-2 py-1 rounded-full whitespace-nowrap hidden md:block">
                        Stability {(player.recovery * 0.9).toFixed(0)}%
                    </div>
                </Html>
            </mesh>

            {/* Torso */}
            <mesh position={[0, 2, 0]} material={bodyMaterial}>
                <cylinderGeometry args={[0.5, 0.4, 1.5, 16, 1, true]} />
            </mesh>

            {/* Glowing Heart/Chest Node */}
            <mesh ref={chestRef} position={[0, 2.2, 0.1]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#FF4D00" emissive="#FF4D00" emissiveIntensity={2} toneMapped={false} />
                <Html position={[-0.5, 0, 0.2]} center className="pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md border border-[#FF4D00]/30 text-[#FF4D00] text-[10px] px-2 py-1 rounded-full whitespace-nowrap drop-shadow-[0_0_10px_#FF4D00] hidden md:block">
                        HR {player.hr} bpm
                    </div>
                </Html>
            </mesh>

            {/* Arms */}
            <mesh position={[-0.8, 1.8, 0]} rotation={[0, 0, 0.2]} material={bodyMaterial}>
                <cylinderGeometry args={[0.15, 0.1, 1.2, 8, 1, true]} />
            </mesh>
            <mesh position={[0.8, 1.8, 0]} rotation={[0, 0, -0.2]} material={bodyMaterial}>
                <cylinderGeometry args={[0.15, 0.1, 1.2, 8, 1, true]} />
            </mesh>

            {/* Legs */}
            <mesh ref={leftLegRef} position={[-0.3, 0.5, 0]} rotation={[0, 0, -0.05]} material={legMaterial}>
                <cylinderGeometry args={[0.2, 0.15, 1.6, 8, 1, true]} />
                <Html position={[-0.4, -0.2, 0]} center className="pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap hidden md:block" style={{ borderColor: balanceColor, color: balanceColor }}>
                        Balance {player.balance}%
                    </div>
                </Html>
            </mesh>
            <mesh ref={rightLegRef} position={[0.3, 0.5, 0]} rotation={[0, 0, 0.05]} material={legMaterial}>
                <cylinderGeometry args={[0.2, 0.15, 1.6, 8, 1, true]} />
            </mesh>

            {/* Hydration Particles (Flowing through body) */}
            <Sparkles
                count={50 * hydrationOpacity}
                scale={[1.2, 3.5, 1.2]}
                position={[0, 1.5, 0]}
                color="#00F0FF"
                size={2}
                speed={0.4}
                opacity={hydrationOpacity}
            />

            {/* Scanning Line Effect */}
            <ScanningLine />
        </group>
    );
};

const ScanningLine = () => {
    const lineRef = useRef();

    useFrame((state) => {
        if (lineRef.current) {
            // Loop from -0.5 to 3.5 over 4 seconds
            const t = (state.clock.elapsedTime % 4) / 4;
            const yPos = -0.5 + (t * 4.0);
            lineRef.current.position.y = yPos;
        }
    });

    return (
        <mesh ref={lineRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.0, 1.5, 32]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
    );
};


// --- UI Components ---
const GlassCard = ({ children, className = '' }) => (
    <div className={`bg-[#0A0F1E]/60 backdrop-blur-xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] rounded-2xl p-5 ${className}`}>
        {children}
    </div>
);

const FormSlider = ({ label, value, onChange, min = 0, max = 100, unit = "%", colorClass = "bg-[#FF4D00]" }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{label}</label>
            <span className="text-sm font-mono text-white bg-black/50 px-2 py-0.5 rounded border border-white/10">{value}{unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-800 accent-${colorClass.replace('bg-', '')}`}
            style={{
                background: `linear-gradient(to right, ${colorClass.includes('FF4D00') ? '#FF4D00' : colorClass.includes('00F0FF') ? '#00F0FF' : '#00FF00'} ${(value - min) / (max - min) * 100}%, #1f2937 ${(value - min) / (max - min) * 100}%)`
            }}
        />
    </div>
);


export default function DigitalTwinProfile() {
    // 1. Data State
    const [players, setPlayers] = useState([
        { id: '#0042', name: 'Alex Mercer', hr: 72, recovery: 100, hydration: 92, balance: 85 },
        { id: '#0089', name: 'Jordan Lee', hr: 135, recovery: 55, hydration: 70, balance: 90 },
    ]);
    const [selectedPlayer, setSelectedPlayer] = useState(players[0]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlayerForm, setNewPlayerForm] = useState({ name: '', hr: 80, recovery: 100, hydration: 100, balance: 100 });
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
    };

    const handleMetricChange = (field, value) => {
        const updatedPlayer = { ...selectedPlayer, [field]: value };
        setSelectedPlayer(updatedPlayer);
        setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
    };

    const handleAddPlayerSubmit = (e) => {
        e.preventDefault();
        if (!newPlayerForm.name.trim()) {
            setFormError('Name is required.');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const newPlayer = {
                id: `#${Math.floor(1000 + Math.random() * 9000)}`,
                name: newPlayerForm.name,
                hr: newPlayerForm.hr,
                recovery: newPlayerForm.recovery,
                hydration: newPlayerForm.hydration,
                balance: newPlayerForm.balance
            };
            const updatedPlayers = [...players, newPlayer];
            setPlayers(updatedPlayers);
            setSelectedPlayer(newPlayer);
            setNewPlayerForm({ name: '', hr: 80, recovery: 100, hydration: 100, balance: 100 });
            setIsSubmitting(false);
            setIsModalOpen(false);
            setFormError('');
        }, 1000); // 1-second fake submit
    };

    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-[#0A0F1E] to-[#000000] overflow-hidden text-white font-sans selection:bg-[#FF4D00] selection:text-white flex flex-col md:flex-row">

            {/* Ambient Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00F0FF]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#FF4D00]/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Left Sidebar: Player List */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-72 h-auto md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0F1E]/80 backdrop-blur-md z-20 flex flex-col flex-shrink-0"
            >
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <Activity className="text-[#00F0FF]" size={24} />
                    <h1 className="text-xl font-bold tracking-widest text-white">TWIN<span className="text-[#FF4D00]">SYNC</span></h1>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Roster</span>
                        <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-[#00F0FF]">{players.length} Active</span>
                    </div>

                    {players.length === 0 ? (
                        <div className="text-center py-10 bg-black/20 rounded-xl border border-white/5 border-dashed">
                            <p className="text-sm text-gray-500 mb-4">No active players.</p>
                            <button onClick={() => setIsModalOpen(true)} className="bg-[#FF4D00] hover:bg-[#ff6a2b] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(255,77,0,0.4)] transition-all">
                                Add First Player
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {players.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => handlePlayerSelect(p)}
                                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between group ${selectedPlayer?.id === p.id
                                            ? 'bg-[#FF4D00]/10 border-[#FF4D00]/50 shadow-[0_0_15px_rgba(255,77,0,0.15)]'
                                            : 'bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedPlayer?.id === p.id ? 'bg-[#FF4D00] text-white shadow-[0_0_10px_#FF4D00]' : 'bg-gray-800 text-gray-400'}`}>
                                            <UserCircle2 size={18} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-semibold ${selectedPlayer?.id === p.id ? 'text-white' : 'text-gray-300'}`}>{p.name}</p>
                                            <p className="text-[10px] text-gray-500 font-mono">{p.id}</p>
                                        </div>
                                    </div>
                                    {selectedPlayer?.id === p.id && (
                                        <motion.div layoutId="activeDot" className="w-2 h-2 rounded-full bg-[#FF4D00] shadow-[0_0_5px_#FF4D00]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF4D00] hover:bg-[#ff6a2b] text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] hover:scale-[1.02] transition-all duration-300"
                    >
                        <Plus size={18} /> ADD NEW PLAYER
                    </button>
                </div>
            </motion.div>

            {/* Center: 3D Viewer */}
            <div className="flex-1 relative h-[50vh] md:h-full z-10 flex flex-col">
                {selectedPlayer ? (
                    <>
                        <div className="absolute top-6 left-6 z-20 pointer-events-none">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={selectedPlayer.id} className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                                <h2 className="text-xl font-bold text-white">{selectedPlayer.name}</h2>
                                <p className="text-xs text-[#00F0FF] font-mono">ID: {selectedPlayer.id} // SECURE LINK ACTIVE</p>
                            </motion.div>
                        </div>
                        <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
                            <ambientLight intensity={0.4} />
                            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} color="#00F0FF" />
                            <pointLight position={[-10, 0, -10]} intensity={1.5} color="#FF4D00" />
                            <StylizedHuman player={selectedPlayer} />
                            <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 4} autoRotate autoRotateSpeed={0.5} />
                            <Environment preset="night" />
                        </Canvas>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <ActivitySquare size={64} className="mb-4 opacity-20" />
                        <p>No player selected</p>
                    </div>
                )}
            </div>

            {/* Right Panel: Live Metric Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-80 h-auto md:h-full border-t md:border-t-0 md:border-l border-white/10 bg-[#0A0F1E]/80 backdrop-blur-md z-20 p-6 flex flex-col flex-shrink-0"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Settings className="text-[#FF4D00]" size={20} />
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Live telemetry</h3>
                </div>

                {selectedPlayer ? (
                    <motion.div key={selectedPlayer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex-1">
                        <GlassCard>
                            <FormSlider
                                label="Heart Rate"
                                value={selectedPlayer.hr}
                                onChange={(val) => handleMetricChange('hr', val)}
                                min={40} max={200} unit=" bpm" colorClass="#FF4D00"
                            />
                            <FormSlider
                                label="Recovery"
                                value={selectedPlayer.recovery}
                                onChange={(val) => handleMetricChange('recovery', val)}
                                min={0} max={100} unit="%" colorClass="#00F0FF"
                            />
                            <FormSlider
                                label="Hydration"
                                value={selectedPlayer.hydration}
                                onChange={(val) => handleMetricChange('hydration', val)}
                                min={0} max={100} unit="%" colorClass="#3b82f6"
                            />
                            <FormSlider
                                label="Balance/Agility"
                                value={selectedPlayer.balance}
                                onChange={(val) => handleMetricChange('balance', val)}
                                min={0} max={100} unit="%" colorClass="#00FF00"
                            />
                        </GlassCard>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
                                <HeartPulse size={24} className={selectedPlayer.hr > 160 ? "text-[#FF4D00] animate-pulse" : "text-gray-400"} />
                                <span className="text-[10px] text-gray-500 font-mono mt-2 block">CARDIAC</span>
                                <span className="text-sm font-bold text-white">{selectedPlayer.hr > 160 ? 'HIGH' : 'NORMAL'}</span>
                            </div>
                            <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
                                <Shield size={24} className={selectedPlayer.recovery < 50 ? "text-[#FF0000]" : "text-[#00F0FF]"} />
                                <span className="text-[10px] text-gray-500 font-mono mt-2 block">STATUS</span>
                                <span className="text-sm font-bold text-white">{selectedPlayer.recovery < 50 ? 'WARNING' : 'OPTIMAL'}</span>
                            </div>
                        </div>

                    </motion.div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-sm text-gray-600">Select a player to edit metrics</p>
                    </div>
                )}
            </motion.div>


            {/* Add New Player Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#0A0F1E]">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <User size={20} className="text-[#FF4D00]" />
                                    Initialize New Subject
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddPlayerSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Subject Name</label>
                                    <input
                                        type="text"
                                        value={newPlayerForm.name}
                                        onChange={(e) => { setNewPlayerForm({ ...newPlayerForm, name: e.target.value }); setFormError(''); }}
                                        placeholder="e.g. Jane Doe"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all"
                                    />
                                    {formError && <p className="text-[#FF0000] text-xs mt-1">{formError}</p>}
                                </div>

                                <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                    <label className="block text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest text-center mb-2">Initial Baselines</label>
                                    <FormSlider label="Heart Rate" value={newPlayerForm.hr} onChange={(val) => setNewPlayerForm({ ...newPlayerForm, hr: val })} min={40} max={200} unit=" bpm" colorClass="#FF4D00" />
                                    <FormSlider label="Recovery %" value={newPlayerForm.recovery} onChange={(val) => setNewPlayerForm({ ...newPlayerForm, recovery: val })} colorClass="#00F0FF" />
                                    <FormSlider label="Hydration %" value={newPlayerForm.hydration} onChange={(val) => setNewPlayerForm({ ...newPlayerForm, hydration: val })} colorClass="#3b82f6" />
                                    <FormSlider label="Balance %" value={newPlayerForm.balance} onChange={(val) => setNewPlayerForm({ ...newPlayerForm, balance: val })} colorClass="#00FF00" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#FF4D00] hover:bg-[#ff6a2b] text-white font-bold py-3 rounded-xl tracking-wider transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {isSubmitting ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                    ) : (
                                        "SUBMIT METRICS TO TWIN"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
