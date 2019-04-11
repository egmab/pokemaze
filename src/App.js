import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import SoloGame from './SoloGame';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/solo-game" component={SoloGame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
