import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => (
  <div className="home">
    <img src="./assets/logopokemaze.png" alt="logo" />
    <div className="form">
      <input
        type="text"
        id="title"
        name="title"
      />
    </div>
    <div className="buttonContainerHome">
      <Link to="/solo-game-1">
        <button
          className="homeButton"
          type="button"
          size="lg"
        >
          Solo mode
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
