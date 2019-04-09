import React from 'react';
import './App.css';
// TO DO : put items, starting points etc. in labyrinths.json => rename it to game.json or something
import * as Labyrinths from './labyrinths.json';
import * as Items from './items.json';
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
