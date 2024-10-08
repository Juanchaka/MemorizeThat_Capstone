import { mongo } from 'mongoose';
import GameSession from '../models/gameSessionSchema.js';

export const startGame = async (req, res) => {
    try {
        const  newGame = new GameSession({ user: req.user.id });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({message: "There was a problem starting the game.", error: err.message});
    }
};

export const endGame = async (req, res) => {
    try {
        const gameId = req.params.id;
        const { score, timeElapsed } = req.body;
        const updatedGame = await GameSession.findByIdAndUpdate(
            gameId,
            { score, timeElapsed, completed: true },
            { new: true }
        );
        if(!updatedGame) {
            return res.status(404).json({ message: "Couldn't find game session!" });
        }
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({message: "There was a problem ending the game.", error: err.message});
    }
};

export const gameHistory = async (req, res) => {
    try {
        const games = await GameSession.find({
            user: req.user.id
        })
        .sort({ createdAt: -1 })
        .limit(10);
        res.json(games);
    } catch (err) {
        res.status(400).json({message: "There was a problem retreiving game history.", error: err.message});
    }
};