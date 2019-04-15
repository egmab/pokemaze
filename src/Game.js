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
    this.player = {
      posX: null,
      posY: null,
      collectedKeys: 0,
    };
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.state = {
      level,
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
    const { level } = this.state;
    // verify if player has caught the pokeball
    if (level.items[this.player.posY][this.player.posX] === '001') {
      this.setState({
        isWinner: true,
        ongoingGame: false,
      });
    }
    // verify if player has caught KeysToCollect
    if (level.items[this.player.posY][this.player.posX] === '002') {
      this.player.collectedKeys += 1;
      level.items[this.player.posY][this.player.posX] = '000';
      this.setState({ level });
      // Open final door when all keys collected
      if (this.player.collectedKeys === level.keysToCollect) {
        this.openFinalDoor();
      }
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
    const { level } = this.state;
    for (let i = 0; i < level.items.length; i += 1) {
      for (let j = 0; j < level.items[i].length; j += 1) {
        if (level.items[i][j] === '900') {
          level.items[i][j] = '000';
          this.setState({ level });
        }
      }
    }
    this.finalDoorOpened = true;
  }

  render() {
    const {
      isWinner, isLoser, pokemon, ongoingGame, level,
    } = this.state;
    return (
      <div className="Game">
        <Chrono count={level.timer} getTime={this.getTime} isWinner={isWinner} />
        {isWinner || isLoser
          ? <EndingGame className="endgame" isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} />
          : null
        }
        <div className="gameContainer">
          <Board tiles={level.tiles} items={level.items} />
          <Player
            ongoingGame={ongoingGame}
            tiles={level.tiles}
            items={level.items}
            startingPositions={level.startingPositions}
            getPlayerPos={this.getPlayerPos}
            className="player"
          />
        </div>
      </div>
    );
  }
}

export default Game;
