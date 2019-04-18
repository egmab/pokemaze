import React from 'react';
import * as GameData from './gameData.json';
import MultiplayerGame from './MultiplayerGame';

const Multiplayer = () => {
  const player1 = 'Player 1';
  const player2 = 'Player 2';
  const selectedLevel = GameData.levels.multi001;
  return (
    <div>
      <MultiplayerGame level={selectedLevel} player1={player1} player2={player2} />
    </div>
  );
};

export default Multiplayer;
