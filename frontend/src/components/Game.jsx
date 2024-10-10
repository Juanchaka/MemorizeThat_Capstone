import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from './Card';
import GameControls from './GameControls';
import { startGame, endGame } from '../services/gameService';
import { shuffleCards, generateCards } from '../utils/gameUtils';
import '../styles/Game.css';

function Game() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      initializeGame();
    }
  }, [user, navigate]);

  useEffect(() => {
    let timer;
    if (!gameOver && gameId) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver, gameId]);

  const initializeGame = async () => {
    try {
      const newGame = await startGame();
      setGameId(newGame.id);
      const newCards = shuffleCards(generateCards(8));
      setCards(newCards);
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setScore(0);
      setTime(0);
      setGameOver(false);
    } catch (error) {
      console.error('Failed to start game:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2 || matchedCards.includes(clickedCard.id) || flippedCards.includes(clickedCard)) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        setMatchedCards([...matchedCards, newFlippedCards[0].id, newFlippedCards[1].id]);
        setScore(score + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }

    if (matchedCards.length + 2 === cards.length) {
      endCurrentGame();
    }
  };

  const endCurrentGame = async () => {
    setGameOver(true);
    try {
      await endGame(gameId, score, time);
    } catch (error) {
      console.error('Failed to end game:', error);
    }
  };

  if (gameOver) {
    return (
      <div className="game-container">
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <p>Time: {time} seconds</p>
          <p>Moves: {moves}</p>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <GameControls score={score} time={time} moves={moves} onEndGame={endCurrentGame} />
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            isFlipped={flippedCards.includes(card) || matchedCards.includes(card.id)}
            onCardClick={() => handleCardClick(card)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Game;