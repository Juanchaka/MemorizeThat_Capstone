import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGameHistory } from '../services/gameService';

function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchLeaderboard();
    }
  }, [user, navigate]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getGameHistory();
      if (Array.isArray(data)) {
        setLeaderboard(data);
      } else {
        throw new Error('Received invalid data format for leaderboard');
      }
    } catch (err) {
      setError(`Failed to fetch leaderboard: ${err.message}`);
      console.error('Error fetching leaderboard:', err);
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No games played yet.</p>
      ) : (
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={entry._id || index}>
              {entry.user?.username || 'Anonymous'}: {entry.score} (Time: {entry.timeElapsed}s)
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default LeaderBoard;