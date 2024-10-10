import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { startGame, endGame, gameHistory } from '../controllers/gameController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/current', auth, getCurrentUser);
router.get('/user/profile', auth, getCurrentUser);
router.post('/game', auth, startGame);
router.post('/game/:id', auth, endGame);
router.get('/game/history', auth, gameHistory);

export default router;