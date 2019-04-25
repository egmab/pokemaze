import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from './Pokedex';

import './DuoGame.css';

const DuoGame = () => {
  return (
    <div className="DuoHome">
      <div className="pokedexJ2">
        <Pokedex player="player2" />
      </div>
      <div className="pokedexJ1">
        <Pokedex player="player1" />
      </div>
      <Link to="/multiplayer">
        <button
          className="homeButton"
          type="button"
          size="lg"
          style={{ marginRight: 100 }}
        >
          PLAY
        </button>
      </Link>
      <div>
        <Link to="/">
          <button
            className="homeButton"
            type="button"
            size="lg"
            style={{ marginRight: 100 }}
          >
            Back to menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DuoGame;
