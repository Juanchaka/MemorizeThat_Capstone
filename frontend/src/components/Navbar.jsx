import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/game">Play Game</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <div className="navbar-right">
                    {user ? (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;