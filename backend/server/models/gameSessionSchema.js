import mongoose, { mongo } from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    moves: {
        type: Number,
        default: 0
    },
    timeElapsed: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

gameSessionSchema.index({ user: 1, moves: 1, timeElapsed: 1 });

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;