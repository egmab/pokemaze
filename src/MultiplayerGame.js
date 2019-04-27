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
    this.fireballs = {};
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
    this.keysToCollect = Math.floor(this.keysToCollect / 2);
    this.player1 = {
      posX: null,
      posY: null,
      collectedKeys: 0,
      capacities: ['fire3'],
    };
    this.player2 = {
      posX: null,
      posY: null,
      collectedKeys: 0,
      capacities: ['invisibility2'],
    };
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.state = {
      finalDoorOpened1: false,
      finalDoorOpened2: false,
      level,
      winner: undefined,
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
        winner: player,
        ongoingGame: false,
      });
      this.setWonPokemon();
    }
    // change the trap
    if (level.tiles[this[player].posY][this[player].posX] === '009') {
      level.tiles[this[player].posY][this[player].posX] = '405';
      this.setState({ level });
    }
    // verify if player has caught KeysToCollect
    if (level.items[this[player].posY][this[player].posX] === level.typeOfKey) {
      if (this[player].collectedKeys < this.keysToCollect) {
        this[player].collectedKeys += 1;
        level.items[this[player].posY][this[player].posX] = '000';
        this.setState({ level });
        // Open final door when all keys collected
        if (this[player].collectedKeys === this.keysToCollect) {
          if (player === 'player1') {
            this.setState({ finalDoorOpened1: true });
          }
          if (player === 'player2') {
            this.setState({ finalDoorOpened2: true });
          }
        }
      }
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
      if (winner === 'player2') {
        winnerName = JSON.parse(localStorage.getItem('connectedPlayer2'));
      }
      if (localStorage.getItem(winnerName)) {
        const actualPlayer = JSON.parse(localStorage.getItem(winnerName));
        actualPlayer.pokemons.push(newPokemon);
        localStorage.setItem(winnerName, JSON.stringify(actualPlayer));
      }
    }
  }


  playerAction(y, x, ability, directionX, directionY) {
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
          } else if (parseInt(level.items[i][j], 10) === switchedLever + 100) {
            const switchedDoor = parseInt(level.items[i][j], 10) - 1;
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
          } else if (parseInt(level.items[i][j], 10) === switchedLever + 100) {
            const switchedDoor = parseInt(level.items[i][j], 10) + 1;
            level.items[i][j] = `${switchedDoor}`;
          }
        }
      }
    }
    if (ability) {
      // Fireballs! :-)
      if (ability.slice(0, -1) === 'fire') {
        level.items[y][x] = '400';
        const fireballId = Math.floor(Math.random() * 99999);
        this.fireballs[fireballId] = { y, x };
        this.fireballs[fireballId].running = setInterval(() => {
          this.fireballs[fireballId].y += directionY;
          this.fireballs[fireballId].x += directionX;
          if (this.fireballs[fireballId].y < 0
            || this.fireballs[fireballId].y >= level.tiles.length
            || this.fireballs[fireballId].x < 0
            || this.fireballs[fireballId].x >= level.tiles[this.fireballs[fireballId].y].length
            || level.items[this.fireballs[fireballId].y][this.fireballs[fireballId].x] !== '000') {
            clearInterval(this.fireballs[fireballId].running);
            setTimeout(() => {
              level.items[this.fireballs[fireballId].y - directionY][this.fireballs[fireballId].x - directionX] = '000';
              this.setState({ level });
            }, 3000);
          } else {
            level.items[this.fireballs[fireballId].y - directionY][this.fireballs[fireballId].x - directionX] = '000';
            level.items[this.fireballs[fireballId].y][this.fireballs[fireballId].x] = '400';
            this.setState({ level });
          }
        }, 300);
      }
    }
    this.setState({ level });
  }

  render() {
    const {
      isWinner, isLoser, pokemon, ongoingGame, level, winner, finalDoorOpened1, finalDoorOpened2,
    } = this.state;
    return (
      <div className="GameMultiplayer">
        {isWinner || isLoser
          ? <EndingGame className="endgame" winner={winner} isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} />
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
            finalDoorOpened1={finalDoorOpened1}
            finalDoorOpened2={finalDoorOpened2}
            capacities1={this.player1.capacities}
            capacities2={this.player2.capacities}
          />
        </div>
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
    );
  }
}

export default MultiplayerGame;
