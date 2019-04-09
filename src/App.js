import React, { Component } from 'react';
import './App.css';
import * as Labyrinths from './labyrinths.json'
import * as Items from './items.json'
import Game from './Game'


class App extends Component {
  render() {
    // TO DO : choose the level
    const labyrinth = Labyrinths.labyrinth1
    const items = Items.labyrinth1_items
    return (
      <Game labyrinth={labyrinth} items={items} />
    )
  }
}


/*          TO DO
class Chrono extends Component {
  render() {
    return (
      <div className="Chrono">
        <p>Chronomètre</p>
      </div>
    );
  }
}
class Capacities extends Component {
  render() {
    return (
      <div className="Capacities">
        <Capacity element="water" />
        <Capacity element="fire" />
      </div>
    );
  }
}
class Capacity extends Component {
  render() {
    return (
      <div
        className="capacityStyle"
        style={{ backgroundImage: `url(${"./assets/capacities/" + this.props.element + ".png"})` }}
      />
    );
  }
}
*/
export default App;
