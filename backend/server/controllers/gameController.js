import GameSession from '../models/gameSessionSchema.js';

export const startGame = async (req, res) => {
    try {
        const newGame = new GameSession({ user: req.user.id });
        await newGame.save();
        res.status(201).json({ id: newGame._id, ...newGame.toObject() });
    } catch (err) {
        res.status(400).json({message: "There was a problem starting the game.", error: err.message});
    }
};

export const endGame = async (req, res) => {
    try {
        const gameId = req.params.id;
        const { moves, timeElapsed, won } = req.body;
        const updatedGame = await GameSession.findByIdAndUpdate(
            gameId,
            { moves, timeElapsed, completed: true, won },
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
            user: req.user.id,
            completed: true,
        })
        .sort({ moves: 1, timeElapsed: 1 })
        .limit(10);
        if (games.length === 0) {
            console.log('No games found for user');
        }
        const formattedGames = games.map((game, index) => ({
            rank: index + 1,
            moves: game.moves,
            timeElapsed: game.timeElapsed
        }));
        res.json(formattedGames);
    } catch (err) {
        console.error('Error in gameHistory:', err);
        res.status(400).json({message: "There was a problem retrieving game history.", error: err.message});
    }
};