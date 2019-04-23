import React from 'react';
import * as GameData from './gameData.json';
import Game from './Game';

const SoloGame = () => {
  // TO DO : choose the level
  const selectedLevel = GameData.levels['001'];
  return (
    <div>
      <Game level={selectedLevel} />
    </div>
  );
};

export default SoloGame;