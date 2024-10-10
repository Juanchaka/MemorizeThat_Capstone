import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";
import LeaderBoard from "./components/LeaderBoard.jsx";
import Profile from "./components/Profile.jsx";
import "./styles/App.css";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
