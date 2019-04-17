import React from 'react';
import MultiplayerGame from './MultiplayerGame';

const Multiplayer = () => {
  const player1 = 'Player 1';
  const player2 = 'Player 2';
  const selection = '001';
  const selectedLevel = JSON.parse(localStorage.getItem('GameData')).default.levels.multiplayer[selection];
  return (
    <div>
      <MultiplayerGame level={selectedLevel} player1={player1} player2={player2} />
    </div>
  );
};

export default Multiplayer;
