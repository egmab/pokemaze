import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => (
  <div className="home">
    <img src="./assets/logopokemaze.png" alt="logo" />
    <div className="buttonContainerHome">
      <Link to="/solo-game-1">
        <button
          className="homeButton"
          type="button"
          size="lg"
        >
          Play solo
        </button>
      </Link>
      <Link to="/solo-game-2">
        <button
          className="homeButton"
          type="button"
          size="lg"
        >
          Demo chrono
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
