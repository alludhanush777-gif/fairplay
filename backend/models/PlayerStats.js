import mongoose from 'mongoose';

const playerStatsSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  biofeedback: {
    hydrationLevel: {
      type: Number,
      required: true,
      min: [0, 'Hydration level cannot be negative'],
      max: [100, 'Hydration level cannot exceed 100'],
      default: 100, // percentage
    },
    oxygenIntake: {
      type: Number,
      required: true,
      min: [0, 'O2 intake cannot be negative'],
      max: [100, 'O2 intake cannot exceed 100'], // or VO2 max scale depending on standard
      default: 95, // percentage
    },
    heartRate: {
      type: Number,
      required: true,
      min: [30, 'Heart rate unusually low'],
      max: [220, 'Heart rate unusually high'],
      default: 60, // bpm
    }
  },
  performance: {
    recoveryPercentage: {
      type: Number,
      required: true,
      min: [0, 'Recovery percentage cannot be negative'],
      max: [100, 'Recovery percentage cannot exceed 100'],
      default: 100, // percentage
    },
    topSpeed: {
      type: Number,
      required: true,
      min: [0, 'Speed cannot be negative'],
      default: 0, // km/h
    },
    agilityScore: {
      type: Number,
      required: true,
      min: [0, 'Agility score cannot be negative'],
      max: [100, 'Agility score cannot exceed 100'],
      default: 50, // out of 100
    },
    balanceScore: {
      type: Number,
      required: true,
      min: [0, 'Balance score cannot be negative'],
      max: [100, 'Balance score cannot exceed 100'],
      default: 50, // out of 100
    }
  },
  history: [
    {
      date: { type: Date, default: Date.now },
      biofeedback: {
        hydrationLevel: Number,
        oxygenIntake: Number,
        heartRate: Number
      },
      performance: {
        recoveryPercentage: Number,
        topSpeed: Number,
        agilityScore: Number,
        balanceScore: Number
      }
    }
  ]
}, { 
  timestamps: true 
});

// Create model if it doesn't exist, else use existing to prevent overwrite errors in dev
export default mongoose.models.PlayerStats || mongoose.model('PlayerStats', playerStatsSchema);
