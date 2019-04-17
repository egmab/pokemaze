import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import SoloGame from './SoloGame';
import SoloGame2 from './SoloGame2';
import Home from './Home';

// <Route path="/game" render={props => <Game level={selectedLevel} {...props} />} />


const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/solo-game" component={SoloGame} />
        <Route path="/solo-game-2" component={SoloGame2} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
