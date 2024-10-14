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

        console.log('Ending game:', { gameId, moves, timeElapsed, won });

        const updatedGame = await GameSession.findByIdAndUpdate(
            gameId,
            { moves, timeElapsed, completed: true, won },
            { new: true }
        );
        if(!updatedGame) {
            return res.status(404).json({ message: "Couldn't find game session!" });
        }

        console.log('Updated game:', JSON.stringify(updatedGame, null, 2));

        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({message: "There was a problem ending the game.", error: err.message});
    }
};

export const gameHistory = async (req, res) => {
    try {
        console.log('Fetching game history for user:', req.user.id);
        const games = await GameSession.find({
            user: req.user.id,
            completed: true,
            won: true,
        })
        .sort({ moves: 1, timeElapsed: 1 })
        .limit(10);

        console.log('Raw game history:', JSON.stringify(games, null, 2));

        const formattedGames = games.map((game, index) => ({
            rank: index + 1,
            moves: game.moves,
            timeElapsed: game.timeElapsed
        }));

        console.log('Formatted game history:', JSON.stringify(formattedGames, null, 2));

        res.json(formattedGames);
    } catch (err) {
        console.error('Error in gameHistory:', err);
        res.status(400).json({message: "There was a problem retrieving game history.", error: err.message});
    }
};