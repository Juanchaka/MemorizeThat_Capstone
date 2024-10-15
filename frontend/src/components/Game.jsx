import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "./Card";
import { startGame, endGame } from "../services/gameService.jsx";
import { shuffleCards, generateCards } from "../utils/gameUtils.jsx";
import { getCurrentUser } from "../services/authService.jsx";
import { useRef } from "react";
import "../styles/Game.css";

function Game() {
  const [canPlaySound, setCanPlaySound] = useState(false);

  const playSoundWithTimeout = (sound, duration) => {
        if (canPlaySound) {
      sound.currentTime = 0;
      sound.play().catch(error => console.error('Error playing sound:', error));
      setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
      }, duration);
    }
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
  const [endTime, setEndTime] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  const flipSound = useRef(new Audio(`${import.meta.env.BASE_URL}card_sound/cardFlip/cardFlip.mp3`));
  
  const matchSound = useRef(
    new Audio(`${import.meta.env.BASE_URL}card_sound/success/success_yaaas.mp3`)
  );
 
  const noMatchSound = useRef(
    new Audio(`${import.meta.env.BASE_URL}card_sound/incorrect/wrong_wowomp.mp3`)
  );
 
  const gameStartSound = useRef(
    new Audio(`${import.meta.env.BASE_URL}card_sound/startGame/new_level.mp3`)
  );
 
  const gameCompleteSound = useRef(
    new Audio(`${import.meta.env.BASE_URL}card_sound/endGame/level_complete.mp3`)
  );

  const endGameSound = useRef(new Audio(`${import.meta.env.BASE_URL}card_sound/endGame/level_complete3.mp3`));

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
    if (!gameOver && gameId && matchedCards.length !== cards.length) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver, gameId, matchedCards.length !== cards.length]);

  useEffect(() => {
    const handleUserInteraction = () => {
      setCanPlaySound(true);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const initializeGame = async () => {
    try {

      const newGame = await startGame();
      setGameId(newGame.id);
      const newCards = shuffleCards(generateCards(1));
      setCards(newCards);
      preloadImages(newCards);
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setScore(0);
      setTime(0);
      setGameOver(false);
      setGameEnded(false);

      setTimeout(() => {
        playSoundWithTimeout(gameStartSound.current, 1150);
      }, 100);
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

        setTimeout(() => {
          if (newMatchedCards.length === cards.length) {
            setEndTime(Date.now())
            playSoundWithTimeout(gameCompleteSound.current, 2000);
            endCurrentGame(true);
          }
        }, 2000);
        
      } else {
        playSoundWithTimeout(noMatchSound.current, 600);
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const endCurrentGame = async (won = false) => {
    if (gameEnded) {
      return;
    }
    setGameEnded(true);
    setGameOver(true);

    [flipSound, matchSound, noMatchSound, gameStartSound, gameCompleteSound, endGameSound].forEach(sound => {
    sound.current.pause();
    sound.current.currentTime = 0;
  });

    playSoundWithTimeout(endGameSound.current, 1900);
    try {
      setMoves(currentMoves => {
        const finalTime = endTime ? Math.floor((Date.now() - endTime) / 1000) + time : time;
        endGame(gameId, currentMoves, finalTime, won).then(result => {
        });
        return currentMoves;
      });

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
    <div className="game-container" onClick={() => setCanPlaySound(true)}>
      <div className="game-controls">
        <div className="game-info">
          <span>Score: {score}</span>
          <span>Time: {time} seconds</span>
          <span>Moves: {moves}</span>
        <button className="end-game-button" onClick={() => endCurrentGame(false)}>
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
