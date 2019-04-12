import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
const Home = () => {

  return (
    <div className="home">
      <img src="./assets/logopokemaze.png" alt="logo" />
      <div className="buttonHome">
        <Link to="/solo-game-1">
          <button
            className="largeBtn2"
            type="button"
            size="lg"
          >
            Play solo
          </button>
        </Link>
        <Link to="/solo-game-2">
          <button
            className="largeBtn2"
            type="button"
            size="lg"
          >
            Demo chrono
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;