import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="home">
      <button
        className="largeBtn2"
        type="button"
        size="lg"
      >
        <Link to="/solo-game-1">Play solo level</Link>

      </button>
      <button
        className="largeBtn2"
        type="button"
        size="lg"
      >
        <Link to="/solo-game-2">Demo chrono</Link>
      </button>
    </div>
  );
};

export default Home;