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
    this.getPlayerPos = this.getPlayerPos.bind(this);
    this.getTime = this.getTime.bind(this);
    this.playerAction = this.playerAction.bind(this);
    this.keysToCollect = 0;
    const { level } = props;
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
    if (level.items[this.player.posY][this.player.posX] === level.typeOfKey) {
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

  resetState() {
    const { level } = this.props;
    this.setState({ level });
  }
  /*
  resetState = () => {
    const levelTest = this.props.level;
    this.setState({ level : levelTest });
  }
  */
  

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
      isWinner, isLoser, pokemon, ongoingGame, level,
    } = this.state;
    return (
      <div className="Game">
        <Chrono count={level.timer} getTime={this.getTime} isWinner={isWinner} />
        {isWinner || isLoser
          ? <EndingGame className="endgame" isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} reset={this.resetState} />
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
            playerAction={this.playerAction}
            className="player"
          />
          <KeysBar
            collectedKeys={this.player.collectedKeys}
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
