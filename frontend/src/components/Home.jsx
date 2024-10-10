import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Memorize That!</h1>
      <p>Test your memory and have fun!</p>
      <Link to="/game">
        <button>Start Playing</button>
      </Link>
    </div>
  );
}

export default Home;