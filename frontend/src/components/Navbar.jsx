import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
    const { user, logout } = useAuth();

    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/game">Play Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    );
}

export default Navbar;