import React, { Component } from 'react';
import Board from './Board';
import Player from './Player';
import DisplayPokemon from './DisplayPokemon';
import Chrono from './Chrono';

class Game extends Component {
  constructor(props) {
    super(props);
    this.getPlayerPos = this.getPlayerPos.bind(this);
    this.getTime = this.getTime.bind(this);
    const { level } = props;
    this.level = level;
    this.player = {
      posX: null,
      posY: null,
    };
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.state = {
      pokemon: undefined,
      isWinner: false,
      isLoser: false,
    };
  }

  componentWillMount() {
    this.getPokemon();
  }

  getPlayerPos(x, y) {
    this.player.posX = x;
    this.player.posY = y;
    if (this.level.items[this.player.posY][this.player.posX] === '001') {
      this.setState({
        isWinner: true,
      });
    }
  }

  getTime(count) {
    if (count === 0) {
      this.setState({
        isLoser: true,
      });
    }
  }

  getPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.randomPokemon}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          pokemon: data,
        });
      });
  }

  render() {
    const { isWinner, isLoser, pokemon } = this.state;
    return (
      <div className="Game">
        <Board tiles={this.level.tiles} items={this.level.items} />
        <Player
          tiles={this.level.tiles}
          startingPositions={this.level.startingPositions}
          getPlayerPos={this.getPlayerPos}
        />
        {isWinner ? <DisplayPokemon title="Congrats !" message="You win" pokemon={pokemon} /> : null}
        {isLoser ? <DisplayPokemon title="Too late !" message="You lose" pokemon={pokemon} /> : null}
        <Chrono count={this.level.timer} getTime={this.getTime} />
      </div>
    );
  }
}

export default Game;
