import React from 'react';
import './App.css';
// import * as Labyrinths from './labyrinths.json';
// import * as Items from './items.json';
// TO DO : using data.json instead of labyrinths and items
import * as GameData from './gameData.json';
import Game from './Game';

const App = () => {
  // TO DO : choose the level
  const selectedLevel = GameData.levels['001'];
  //  const labyrinth = Labyrinths.labyrinth1;
  //  const items = Items.labyrinth1_items;
  return (
    <div>
      <Game
        labyrinth={selectedLevel}
      />
    </div>
  );
};

export default App;
