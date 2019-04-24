import React, { Component } from 'react';
import Board from './Board';
import Players from './Players';
import EndingGame from './EndingGame';
import KeysBar from './KeysBar';
import './Game.css';


class MultiplayerGame extends Component {
  constructor(props) {
    super(props);
    this.getPlayerPos = this.getPlayerPos.bind(this);
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
    this.player1 = {
      posX: null,
      posY: null,
      collectedKeys: 0,
      finalDoorOpened: false,
      capacities: ['punch1', 'punch2', 'punch3'],
    };
    this.player2 = {
      posX: null,
      posY: null,
      collectedKeys: 0,
      finalDoorOpened: false,
      capacities: ['punch3'],
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

  getPlayerPos(x, y, player) {
    this[player].posX = x;
    this[player].posY = y;
    const { level } = this.state;
    // verify if player has caught the pokeball
    if (level.items[this[player].posY][this[player].posX] === '001') {
      this.setState({
        isWinner: true,
        ongoingGame: false,
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
        this[player].finalDoorOpened = true;
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

  render() {
    const {
      isWinner, isLoser, pokemon, ongoingGame, level,
    } = this.state;
    return (
      <div className="Game">
        {isWinner || isLoser
          ? <EndingGame className="endgame" isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} />
          : null
        }
        <div className="gameContainer">
          <Board tiles={level.tiles} items={level.items} />
          <Players
            ongoingGame={ongoingGame}
            tiles={level.tiles}
            items={level.items}
            startingPositions={level.startingPositions}
            getPlayerPos={this.getPlayerPos}
            playerAction={this.playerAction}
            finalDoorOpened1={this.player1.finalDoorOpened}
            finalDoorOpened2={this.player2.finalDoorOpened}
            capacities1={this.player1.capacities}
            capacities2={this.player2.capacities}
          />
          <div className="KeysBarMultiplayer">
            <KeysBar
              collectedKeys={this.player1.collectedKeys}
              finalDoorID={this.finalDoorID}
              typeOfKey={this.typeOfKey}
              numberOfKeys={this.keysToCollect}
              playerNumber="player1"
            />
            <KeysBar
              collectedKeys={this.player2.collectedKeys}
              finalDoorID={this.finalDoorID}
              typeOfKey={this.typeOfKey}
              numberOfKeys={this.keysToCollect}
              playerNumber="player2"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MultiplayerGame;
