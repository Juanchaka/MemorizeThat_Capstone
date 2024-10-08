import GameSession from '../models/gameSessionSchema.js';

export const startGame = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json({message: "There was a problem starting the game.", error: err.message});
    }
};

export const endGame = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json({message: "There was a problem ending the game.", error: err.message});
    }
};

export const gameHistory = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json({message: "There was a problem retreiving game history.", error: err.message});
    }
};