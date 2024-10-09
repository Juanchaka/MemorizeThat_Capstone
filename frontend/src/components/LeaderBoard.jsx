import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/gameService';

function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaderboard(data);
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map(entry => (
          <li key={entry.id}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoard;