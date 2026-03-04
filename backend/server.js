import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store to prevent Mongoose timeouts
let mockDatabase = [];

console.log('Using in-memory mock database to prevent connection timeouts.');

// Routes
app.post('/api/players/metrics', async (req, res) => {
    try {
        const { playerId, biofeedback, performance } = req.body;

        // Upsert logic for in-memory db
        let playerIndex = mockDatabase.findIndex(p => p.playerId === playerId);
        let stats;

        if (playerIndex >= 0) {
            // Update existing
            mockDatabase[playerIndex] = {
                ...mockDatabase[playerIndex],
                biofeedback: { ...mockDatabase[playerIndex].biofeedback, ...biofeedback },
                performance: { ...mockDatabase[playerIndex].performance, ...performance },
            };
            mockDatabase[playerIndex].history.push({ biofeedback, performance, timestamp: new Date() });
            stats = mockDatabase[playerIndex];
        } else {
            // Create New
            stats = {
                playerId,
                biofeedback,
                performance,
                history: [{ biofeedback, performance, timestamp: new Date() }]
            };
            mockDatabase.push(stats);
        }

        console.log(`Successfully saved metrics for player: ${playerId}`);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error adding metrics' });
    }
});

// GET route to fetch latest metrics for a player
app.get('/api/players/metrics/:playerId', (req, res) => {
    try {
        const { playerId } = req.params;
        const stats = mockDatabase.find(p => p.playerId === playerId);

        if (stats) {
            res.status(200).json({ success: true, data: stats });
        } else {
            res.status(404).json({ success: false, message: 'Player data not found in backend yet.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching metrics' });
    }
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
