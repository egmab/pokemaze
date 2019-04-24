import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from './Pokedex';

import './DuoGame.css';

const DuoGame = () => {
  return (
    <div className="DuoHome">
      <div className="pokedexJ1">
        <Pokedex player="player1" />
      </div>
      <div className="pokedexJ2">
        <Pokedex player="player2" />
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
    </div>
  );
};

export default DuoGame;
