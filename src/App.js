import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import SoloGame from './SoloGame';
import SoloGame2 from './SoloGame2';
import Multiplayer from './Multiplayer';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/solo-game-1" component={SoloGame} />
        <Route path="/solo-game-2" component={SoloGame2} />
        <Route path="/multiplayer" component={Multiplayer} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
