import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import './App.css';
import SoloGame from './SoloGame';
import DuoGame from './DuoGame';
import Game from './Game';
import Multiplayer from './Multiplayer';
import Home from './Home';
import Pokedex from './Pokedex';
import Pokeditor from './Pokeditor';
import * as GameData from './gameData.json';

// <Route path="/game" render={props => <Game level={selectedLevel} {...props} />} />

const App = () => {
  // If GameData is not in localstorage, add it
  if (!localStorage.getItem('Gamedata')) {
  // TO DO: check if localStorage is different from online json?
  // Could conflict with futur custom levels + updates
  // || localStorage.getItem('Gamedata', JSON.stringify(GameData)) !== JSON.stringify(GameData)) {
    localStorage.setItem('GameData', JSON.stringify(GameData));
  }
  if (!localStorage.getItem('PokemazeCustomLevels')) {
    localStorage.setItem('PokemazeCustomLevels', JSON.stringify({}));
  }

  return (
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/solo-game" component={SoloGame} />
          <Route path="/duo-game" component={DuoGame} />
          <Route path="/game" component={Game} />
          <Route path="/multiplayer" component={Multiplayer} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/pokeditor" component={Pokeditor} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
