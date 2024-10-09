import React, { useState, useEffect } from 'react';
import Card from './Card';
import GameControls from './GameControls';
import { startGame, endGame } from '../services/gameService';
import { shuffleCards, calculateScore } from '../utils/gameUtils';

function Game() {
    const [gameState, setGameState] = useState(null);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      initializeGame();
    }, []);
  
    const initializeGame = async () => {
      const newGame = await startGame();
      setGameState(newGame);
      const shuffledCards = shuffleCards(generateCards());
      setCards(shuffledCards);
    };
  
    const handleCardClick = (card) => {
    };
  
    const checkForMatch = () => {
    };
  
    const endCurrentGame = async () => {
      const finalScore = calculateScore(time, score);
      await endGame(gameState.id, finalScore, time);
    };

    return (
        <div className="game-container">
        <GameControls score={score} time={time} onEndGame={endCurrentGame} />
        <div className="card-grid">
          {cards.map(card => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
    );
}

export default Game;