import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? (import.meta.env.VITE_APP_API_URL || 'https://memorize-that.onrender.com')
  : '/api';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const startGame = async () => {
  try {
    const response = await axios.post(`${API_URL}/game`, {}, {
      headers: authHeader()
    });
    if (response.data && response.data.id) {
      return response.data;
    } else {
      throw new Error('No game ID received from server');
    }
  } catch (error) {
    console.error('Error starting game:', error);
    throw error;
  }
};

export const endGame = async (gameId, moves, timeElapsed, won) => {
  if (!gameId) {
    throw new Error('No game ID provided');
  }
  try {
    const response = await axios.post(`${API_URL}/game/${gameId}`, { moves, timeElapsed, won }, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error ending game:', error);
    throw error;
  }
};

export const getGameHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/game/history`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching game history:', error);
    throw error;
  }
};