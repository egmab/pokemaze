import React, { Component } from 'react';
import Board from './Board';
import Player from './Player';
import EndingGame from './EndingGame';
import Chrono from './Chrono';
import './Game.css';


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
      collectedKeys: 0,
    };
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.state = {
      pokemon: undefined,
      isWinner: false,
      isLoser: false,
      ongoingGame: true,
    };
  }

  componentWillMount() {
    this.getPokemon();
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

  getPlayerPos(x, y) {
    this.player.posX = x;
    this.player.posY = y;
    if (this.level.items[this.player.posY][this.player.posX] === '001') {
      this.setState({
        isWinner: true,
        ongoingGame: false,
      });
    }
    // Increment collectedKeys
    if (this.level.items[this.player.posY][this.player.posX] === '002') {
      this.player.collectedKeys += 1;
      console.log(this.player.collectedKeys)
    }
    // Open final door when all keys collected
    if (this.player.collectedKeys === this.level.keysToCollect
      && this.finalDoorOpened === undefined) {
      this.openFinalDoor();
    }
  }

  getTime(count) {
    if (count === 0) {
      this.setState({
        isLoser: true,
        ongoingGame: false,
      });
    }
  }

  openFinalDoor() {
    console.log("ouvert")
    for (let i = 0; i < this.level.tiles.length; i += 1) {
      for (let j = 0; j < this.level.tiles[i]; j += 1) {
        if (this.level.tiles[i][j] === '900') {
          this.level.tiles[i][j] = '400';
        }
      }
    }
    this.finalDoorOpened = true;
  }

  render() {
    const {
      isWinner, isLoser, pokemon, ongoingGame,
    } = this.state;
    return (
      <div className="Game">
        <Chrono count={this.level.timer} getTime={this.getTime} isWinner={isWinner} />
        {isWinner || isLoser
          ? <EndingGame className="endgame" isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} />
          : null
        }
        <div className="gameContainer">
          <Board tiles={this.level.tiles} items={this.level.items} />
          <Player
            ongoingGame={ongoingGame}
            tiles={this.level.tiles}
            startingPositions={this.level.startingPositions}
            getPlayerPos={this.getPlayerPos}
            className="player"
          />
        </div>
      </div>
    );
  }
}

export default Game;
