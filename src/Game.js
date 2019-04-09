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
    this.randomPokemon = undefined;
    this.player = {
      posX: '',
      posY: '',
    };
    this.state = {
      pokemon: undefined,
      isWinner: false,
      isLoser: false,
    };
  }

  componentWillMount() {
    const { playerX } = this.props;
    const { playerY } = this.props;
    this.player.posX = playerX;
    this.player.posY = playerY;
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.getPokemon();
  }

  getPlayerPos(x, y) {
    const { items } = this.props;
    this.player.posX = x;
    this.player.posY = y;
    if (items[this.player.posY][this.player.posX] === '001') {
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
    const { labyrinth, items, count } = this.props;
    const { isWinner, isLoser, pokemon } = this.state;
    return (
      <div className="Game">
        <Board labyrinth={labyrinth} items={items} />
        <Player labyrinth={labyrinth} getPlayerPos={this.getPlayerPos} />
        {isWinner ? <DisplayPokemon title="Congrats !" message="You win" pokemon={pokemon} /> : null}
        {isLoser ? <DisplayPokemon title="Too late !" message="You lose" pokemon={pokemon} /> : null}
        <Chrono count={count} getTime={this.getTime} />
      </div>
    );
  }
}

export default Game;
