import { create } from 'zustand';

export const speakAlert = (message) => {
    // Stop any currently speaking voice to avoid queuing up multiple alerts
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 0.9; // Deep, professional coach voice
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
};

const usePlayerStore = create((set) => ({
    players: [
        { id: '#0001', name: 'Alex Mercer', hr: 72, recovery: 100, hydration: 95, balance: 90, o2: 98, topSpeed: 32, agility: 85 },
        { id: '#0042', name: 'James Carter', hr: 75, recovery: 65, hydration: 88, balance: 80, o2: 96, topSpeed: 28, agility: 75 },
        { id: '#0089', name: 'Jordan Lee', hr: 135, recovery: 55, hydration: 70, balance: 90, o2: 92, topSpeed: 24, agility: 60 },
    ],
    selectedPlayerId: '#0042',
    highlightedPart: null,
    view: 'vitality',

    setView: (view) => set({ view }),
    setSelectedPlayerId: (id) => set({ selectedPlayerId: id, highlightedPart: null }),
    setHighlightedPart: (part) => set({ highlightedPart: part }),

    addPlayer: (player) => set((state) => ({
        players: [...state.players, player],
        selectedPlayerId: player.id // Automatically select the new player
    })),

    updatePlayerMetrics: (id, metrics) => set((state) => {
        if (metrics.recovery !== undefined && metrics.recovery < 50) {
            const player = state.players.find(p => p.id === id);
            // Only alert when it drops below 50 to avoid constant repeating during slider drag
            if (player && player.recovery >= 50) {
                speakAlert(`Warning. ${player.name}'s recovery is critically low. Initiate rest protocol.`);
                // Trigger a temporary part highlight for the chest/heart if recovery is low
                set({ highlightedPart: 'chest' });
                setTimeout(() => set({ highlightedPart: null }), 5000);
            }
        }
        return {
            players: state.players.map((p) =>
                p.id === id ? { ...p, ...metrics } : p
            )
        };
    })
}));

export default usePlayerStore;
