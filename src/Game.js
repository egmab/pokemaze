import React, { Component } from 'react';
import Board from './Board';
import Player from './Player';
import Chrono from './Chrono';

class Game extends Component {
  constructor(props) {
    super(props);
    this.getPlayerPos = this.getPlayerPos.bind(this);
    this.player = {
      posX: '',
      posY: '',
    };
  }

  componentWillMount() {
    const { playerX } = this.props;
    const { playerY } = this.props;
    this.player.posX = playerX;
    this.player.posY = playerY;
  }

  getPlayerPos(x, y) {
    const { items } = this.props;
    this.player.posX = x;
    this.player.posY = y;
    if (items[this.player.posY][this.player.posX] !== '000') {
      alert('pokeball');
    }
  }

  render() {
    const { labyrinth, items, count } = this.props;
    return (
      <div className="Game">
        <Board labyrinth={labyrinth} items={items} />
        <Player labyrinth={labyrinth} getPlayerPos={this.getPlayerPos} />
        <Chrono count={count} />
      </div>
    );
  }
}

export default Game;
