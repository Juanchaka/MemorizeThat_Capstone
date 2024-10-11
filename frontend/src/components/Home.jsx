import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Memorize That!</h1>
      <p>Test your memory and have fun!</p>
      <Link to="/game">
        <button className="start-button">Start Playing</button>
      </Link>
    </div>
  );
}

export default Home;