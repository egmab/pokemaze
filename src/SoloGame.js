import React from 'react';
import Game from './Game';

const SoloGame = () => {
  // TO DO : choose the level
  const selection = '001';
  const selectedLevel = JSON.parse(localStorage.getItem('GameData')).default.levels.solo[selection];
  return (
    <div>
      <Game level={selectedLevel} />
    </div>
  );
};

export default SoloGame;
