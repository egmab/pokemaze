import React, { Component } from 'react';
import Board from './Board'
import Player from './Player'

class Game extends Component {
  constructor(props) {
    super(props)
    this.getPlayerPos = this.getPlayerPos.bind(this)
    this.player = {
      posX: '',
      posY: '',
    }
  }
  componentWillMount() {
    this.player.posX = this.props.playerX
    this.player.posY = this.props.playerY
  }

  getPlayerPos(x, y) {
    this.player.posX = x
    this.player.posY = y
    if (this.props.items[this.player.posY][this.player.posX] !== "000") {
      alert('pokeball')
    }
  }
  render() {
    return (
      <div className="Game">
        {/*    TO DO
        <Chrono />
        <Capacities />
        */}
        <Board labyrinth={this.props.labyrinth} items={this.props.items} />
        <Player labyrinth={this.props.labyrinth} getPlayerPos={this.getPlayerPos} />
      </div>
    );
  }
}

export default Game