import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getGameHistory } from '../services/gameService.jsx';
import '../styles/HighScore.css';

function HighScore() {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchHighScores();
    }
  }, [user, navigate]);

  const fetchHighScores = async () => {
    try {
      setLoading(true);
      const data = await getGameHistory();
      setHighScores(data);
    } catch (err) {
      setError('Failed to fetch high scores');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="auth-container"><p>Loading high scores...</p></div>;
  if (error) return <div className="auth-container"><p>Error: {error}</p></div>;

  return (
    <div className="content-container">
    <div className="high-score-container">
      <div className="high-score-content">
        <h2>Your Fatests times</h2>
        <table className="high-score-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Moves</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((entry) => (
              <tr key={entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.moves}</td>
                <td>{entry.timeElapsed ? `${entry.timeElapsed}s` : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default HighScore;