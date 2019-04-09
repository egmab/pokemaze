import React from 'react';
import './App.css';
import * as Labyrinths from './labyrinths.json';
import * as Items from './items.json';
// TO DO : using data.json instead of labyrinths and items
// import * as Data from './data.json';
import Game from './Game';

const App = () => {
  const labyrinth = Labyrinths.labyrinth1;
  const items = Items.labyrinth1_items;
  return (
    // TO DO : choose the level
    <div>
      <Game
        labyrinth={labyrinth}
        items={items}
        count="120"
        playerX="0"
        playerY="0"
      />
    </div>
  );
};

export default App;
