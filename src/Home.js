import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="home">
      <Link to="/solo-game-1">
        <button
          className="largeBtn2"
          type="button"
          size="lg"
        >
          Play solo level
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
  );
};

export default Home;