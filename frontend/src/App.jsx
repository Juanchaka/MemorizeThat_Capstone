import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Game from './components/Game.jsx';
// import LeaderBoard from './components/LeaderBoard.jsx';
import Profile from './components/Profile.jsx';
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        {/* <Route path='/leaderboard' element={<LeaderBoard />} /> */}
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App
