import React, { Component } from 'react';
import Board from './Board'
import Player from './Player'

class Game extends Component {
  render() {
    // TO DO : put items, starting points etc. in labyrinths.json => rename it to game.json or something
    return (
      <div className="Game">
        {/*    TO DO
        <Chrono />
        <Capacities />
        */}
        <Board labyrinth={this.props.labyrinth} items={this.props.items} />
        <Player labyrinth={this.props.labyrinth} />
      </div>
    );
  }
}

export default Game