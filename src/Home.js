import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => (
  <div className="home">
    <img src="./assets/logopokemaze.png" alt="logo" />
    <div className="buttonContainerHome">
      <Link to="/solo-game">
        <button
          className="homeButton"
          type="button"
          size="lg"
          style={{ marginRight: 100 }}
        >
          Play solo
        </button>
      </Link>
      <Link to="/solo-game-2">
        <button
          className="homeButton"
          type="button"
          size="lg"
          style={{ marginRight: 100 }}
        >
          Demo chrono
        </button>
      </Link>
      <Link to="/pokedex">
        <button
          className="homeButton"
          type="button"
          size="lg"
          style={{ marginRight: 100 }}
        >
          Pokedex
        </button>
      </Link>
      <Link to="/multiplayer">
        <button
          className="homeButton"
          type="button"
          size="lg"
        >
          Multiplayer
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
