import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "./Card";
import { startGame, endGame } from "../services/gameService";
import { shuffleCards, generateCards } from "../utils/gameUtils";
import { getCurrentUser } from "../services/authService";
import { useRef } from "react";
import "../styles/Game.css";

function Game() {
  const playSoundWithTimeout = (sound, duration) => {
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;
    }, duration);
  };

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameId, setGameId] = useState(null);

  const flipSound = useRef(new Audio("/card_sound/cardFlip/cardFlip.mp3"));
  
  const matchSound = useRef(
    new Audio("/card_sound/success/success_yaaas.mp3")
  );
 
  const noMatchSound = useRef(
    new Audio("/card_sound/incorrect/wrong_wowomp.mp3")
  );
 
  const gameStartSound = useRef(
    new Audio("/card_sound/startGame/new_level.mp3")
  );
 
  const gameCompleteSound = useRef(
    new Audio("/card_sound/endGame/level_complete.mp3")
  );

  const endGameSound = useRef(new Audio("/card_sound/endGame/level_complete3.mp3"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else if (!user) {
      getCurrentUser()
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Failed to get current user:", error);
          navigate("/login");
        });
    } else {
      initializeGame();
    }
  }, [user, navigate, setUser]);

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
      playSoundWithTimeout(gameStartSound.current, 1150);
      const newGame = await startGame();
      setGameId(newGame.id);
      const newCards = shuffleCards(generateCards(8));
      setCards(newCards);

      preloadImages(newCards);
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setScore(0);
      setTime(0);
      setGameOver(false);
    } catch (error) {
      console.error("Failed to start game:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const preloadImages = (cards) => {
    cards.forEach((card) => {
      const img = new Image();
      img.src = card.imageUrl;
    });
  };

  const handleCardClick = (clickedCard) => {
    if (
      flippedCards.length === 2 ||
      matchedCards.includes(clickedCard.id) ||
      flippedCards.includes(clickedCard)
    )
      return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (flippedCards.length === 0) {
      playSoundWithTimeout(flipSound.current, 500);
    }

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        playSoundWithTimeout(matchSound.current, 2000);
        const newMatchedCards = [
          ...matchedCards,
          newFlippedCards[0].id,
          newFlippedCards[1].id,
        ];
        setMatchedCards(newMatchedCards);
        setScore(score + 10);
        setFlippedCards([]);

        if (newMatchedCards.length === cards.length) {
          setTimeout(() => {
            playSoundWithTimeout(gameCompleteSound.current, 2000);
            endCurrentGame();
          }, 2000);
        }
      } else {
        playSoundWithTimeout(noMatchSound.current, 600);
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const endCurrentGame = async () => {
    setGameOver(true);
    playSoundWithTimeout(endGameSound.current, 1900);
    try {
      await endGame(gameId, score, time);
    } catch (error) {
      console.error("Failed to end game:", error);
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
      <div className="game-controls">
        <div className="game-info">
          <span>Score: {score}</span>
          <span>Time: {time} seconds</span>
          <span>Moves: {moves}</span>
        <button className="end-game-button" onClick={endCurrentGame}>
          End Game
        </button>
        </div>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={
              flippedCards.includes(card) || matchedCards.includes(card.id)
            }
            onCardClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
