import React from 'react';
// import * as Labyrinths from './labyrinths.json';
// import * as Items from './items.json';
// TO DO : using data.json instead of labyrinths and items
import * as GameData from './gameData.json';
import Game from './Game';

const SoloGame2 = () => {
  // TO DO : choose the level
  const selectedLevel = GameData.levels['002'];
  return (
    <div>
      <Game level={selectedLevel} />
    </div>
  );
};

export default SoloGame2;
