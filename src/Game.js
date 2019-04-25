import React, { Component } from 'react';
import Board from './Board';
import Player from './Player';
import EndingGame from './EndingGame';
import Chrono from './Chrono';
import KeysBar from './KeysBar';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    const { level } = props;
    this.level = level;
    this.getPlayerPos = this.getPlayerPos.bind(this);
    this.getTime = this.getTime.bind(this);
    this.playerAction = this.playerAction.bind(this);
    this.keysToCollect = 0;

    for (let i = 0; i < level.items.length; i += 1) {
      for (let j = 0; j < level.items[i].length; j += 1) {
        if (parseInt(level.items[i][j], 10) >= 900
          && parseInt(level.items[i][j], 10) <= 999) {
          this.finalDoorID = level.items[i][j];
        }
        if (parseInt(level.items[i][j], 10) >= 2
          && parseInt(level.items[i][j], 10) <= 19) {
          this.keysToCollect += 1;
          this.typeOfKey = level.items[i][j];
        }
      }
    }
    this.player1 = {
      posX: null,
      posY: null,
      collectedKeys: 0,
    };
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.state = {
      level: JSON.parse(JSON.stringify(level)),
      pokemon: undefined,
      winner: undefined,
      isWinner: false,
      isLoser: false,
      ongoingGame: true,
      tutoWinner: false,
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

  getPlayerPos(x, y, player) {
    this[player].posX = x;
    this[player].posY = y;
    const { level } = this.state;

    // verify if player has caught the pokeball
    if (!level.isTuto && level.items[this[player].posY][this[player].posX] === '001') {
      this.setState({
        winner: player,
        isWinner: true,
        ongoingGame: false,
      });
      this.setWonPokemon();
    }
    if (level.isTuto && level.items[this[player].posY][this[player].posX] === '001') {
      this.setState({
        tutoWinner: true,
      });
    }
    // change the trap
    if (level.tiles[this[player].posY][this[player].posX] === '009') {
      level.tiles[this[player].posY][this[player].posX] = '405';
      this.setState({ level });
    }
    // verify if player has caught KeysToCollect
    if (level.items[this[player].posY][this[player].posX] === level.typeOfKey) {
      this[player].collectedKeys += 1;
      level.items[this[player].posY][this[player].posX] = '000';
      this.setState({ level });
      // Open final door when all keys collected
      if (this[player].collectedKeys === this.keysToCollect) {
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


  setWonPokemon = () => {
    const { isWinner, pokemon, winner } = this.state;
    if (isWinner) {
      const newPokemon = pokemon.name;
      let winnerName = 'winner';
      if (winner === 'player1') {
        winnerName = JSON.parse(localStorage.getItem('connectedPlayer'));
      }
      if (localStorage.getItem(winnerName)) {
        const actualPlayer = JSON.parse(localStorage.getItem(winnerName));
        actualPlayer.pokemons.push(newPokemon);
        localStorage.setItem(winnerName, JSON.stringify(actualPlayer));
      }
    }
  }

  playerAction(y, x) {
    const { level } = this.state;
    // Switches lever ON/OFF: even=> item+1, odd=> item-1
    // Example: Lever(id: 700) becomes 701. Lever (id: 701) becomes 700
    // AND
    // Mutates the corresponding gate(s)
    // Example: Lever 700 becomes 701, changing item(s) 800 to 801, and vice versa
    if (parseInt(level.items[y][x], 10) % 2 === 0) {
      const switchedLever = parseInt(level.items[y][x], 10) + 1;
      level.items[y][x] = `${switchedLever}`;
      for (let i = 0; i < level.items.length; i += 1) {
        for (let j = 0; j < level.items[i].length; j += 1) {
          if (parseInt(level.items[i][j], 10) === switchedLever + 99) {
            const switchedDoor = parseInt(level.items[i][j], 10) + 1;
            level.items[i][j] = `${switchedDoor}`;
          }
        }
      }
    } else {
      const switchedLever = parseInt(level.items[y][x], 10) - 1;
      level.items[y][x] = `${switchedLever}`;
      for (let i = 0; i < level.items.length; i += 1) {
        for (let j = 0; j < level.items[i].length; j += 1) {
          if (parseInt(level.items[i][j], 10) === switchedLever + 101) {
            const switchedDoor = parseInt(level.items[i][j], 10) - 1;
            level.items[i][j] = `${switchedDoor}`;
          }
        }
      }
    }
    this.setState({ level });
  }

  openFinalDoor() {
    const { level } = this.state;
    for (let i = 0; i < level.items.length; i += 1) {
      for (let j = 0; j < level.items[i].length; j += 1) {
        if (parseInt(level.items[i][j], 10) >= 900) {
          level.items[i][j] = '000';
          this.setState({ level });
        }
      }
    }
    this.finalDoorOpened = true;
  }


  render() {
    const {
      isWinner, isLoser, pokemon, ongoingGame, level, winner, tutoWinner,
    } = this.state;
    return (
      <div className="Game">
        <Chrono count={level.timer} getTime={this.getTime} isWinner={isWinner} />
        {isWinner || isLoser || tutoWinner
          ? <EndingGame className="endgame" tutoWinner={tutoWinner} winner={winner} isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} />
          : null
        }
        <div className="gameContainer">
          <Board tiles={level.tiles} items={level.items} />
          <Player
            ongoingGame={ongoingGame}
            tiles={level.tiles}
            items={level.items}
            startingPositions={level.startingPositions.player1}
            getPlayerPos={this.getPlayerPos}
            playerAction={this.playerAction}
            className="player"
            playerNumber="player1"
          />
          <KeysBar
            collectedKeys={this.player1.collectedKeys}
            finalDoorID={this.finalDoorID}
            typeOfKey={this.typeOfKey}
            numberOfKeys={this.keysToCollect}
          />
        </div>
      </div>
    );
  }
}

export default Game;
