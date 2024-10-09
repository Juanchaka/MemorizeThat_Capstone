import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const startGame = async () => {
  const response = await axios.post(`${API_URL}/game`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const endGame = async (gameId, score, timeElapsed) => {
  const response = await axios.post(`${API_URL}/game/${gameId}`, { score, timeElapsed }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${API_URL}/game/leaderboard`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};