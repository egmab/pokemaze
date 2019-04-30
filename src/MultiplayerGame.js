import React, { Component } from 'react';
import Board from './Board';
import Players from './Players';
import EndingGame from './EndingGame';
import KeysBar from './KeysBar';
import './Game.css';

/*
<img
src={`http://pokestadium.com/sprites/xy/${pokemon1}.gif`}
alt={pokemon1}
/> */

class MultiplayerGame extends Component {
  constructor(props) {
    super(props);
    this.getPlayerPos = this.getPlayerPos.bind(this);
    this.playerAction = this.playerAction.bind(this);
    this.keysToCollect = 0;
    this.projectiles = {};
    const {
      level, pokemon1, pokemon2, capacity1, capacity2,
    } = props;
    // Creates projectiles matrix
    const projectiles = [];
    for (let i = 0; i < level.tiles.length; i += 1) {
      projectiles.push([]);
      for (let j = 0; j < level.tiles[i].length; j += 1) {
        projectiles[i].push('000');
      }
    }
    // Scans levels for final door and determines keys to collect
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
      capacities: [capacity1],
      // capacities: [capacity1],
      pokemon: pokemon1,
    };
    this.player2 = {
      posX: null,
      posY: null,
      collectedKeys: 0,
      capacities: [capacity2],
      // capacities: [capacity2],
      pokemon: pokemon2,
    };
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151));
    this.state = {
      finalDoorOpened1: false,
      finalDoorOpened2: false,
      level,
      projectiles,
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
    let pokemonType = '';
    if (pokemon.types) {
      if (pokemon.types[1]) {
        pokemonType = pokemon.types[1].type.name;
      } else {
        pokemonType = pokemon.types[0].type.name;
      }
    }
    if (isWinner) {
      const newPokemon = { name: pokemon.name, type: pokemonType };
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


  playerAction(y, x, capacity, directionX, directionY) {
    const { level } = this.state;
    // Switches lever ON/OFF: even=> item+1, odd=> item-1
    // Example: Lever(id: 700) becomes 701. Lever (id: 701) becomes 700
    // AND
    // Mutates the corresponding gate(s)
    // Example: Lever 700 becomes 701, changing item(s) 800 to 801, and vice versa
    if (parseInt(level.items[y][x], 10) >= 700
      && parseInt(level.items[y][x], 10) <= 799) {
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
    }
    if (capacity) {
      const { projectiles } = this.state;
      // projectiles! :-)
      if (capacity.slice(0, -1) === 'fire') {
        projectiles[y][x] = '001';
        const fireballId = Math.floor(Math.random() * 99999);
        this.projectiles[fireballId] = { y, x };
        this.projectiles[fireballId].running = setInterval(() => {
          this.projectiles[fireballId].y += directionY;
          this.projectiles[fireballId].x += directionX;
          if (this.projectiles[fireballId].y < 0
            || this.projectiles[fireballId].y >= projectiles.length
            || this.projectiles[fireballId].x < 0
            || this.projectiles[fireballId].x >= projectiles[this.projectiles[fireballId].y].length
            || projectiles[this.projectiles[fireballId].y][this.projectiles[fireballId].x] !== '000') {
            clearInterval(this.projectiles[fireballId].running);
            projectiles[this.projectiles[fireballId].y - directionY * 2][this.projectiles[fireballId].x - directionX * 2] = '000';
            this.setState({ projectiles });
            setTimeout(() => {
              projectiles[this.projectiles[fireballId].y - directionY][this.projectiles[fireballId].x - directionX] = '000';
              this.setState({ projectiles });
            }, 3000);
          } else {
            setTimeout(() => {
              projectiles[this.projectiles[fireballId].y - directionY][this.projectiles[fireballId].x - directionX] = '000';
            }, 50);
            projectiles[this.projectiles[fireballId].y][this.projectiles[fireballId].x] = '001';
            this.setState({ projectiles });
          }
        }, 200);
      }
      // Lightning bolts
      if (capacity.slice(0, -1) === 'electric') {
        projectiles[y][x] = '002';
        const lightningBoltId = Math.floor(Math.random() * 99999);
        this.projectiles[lightningBoltId] = { y, x };
        this.projectiles[lightningBoltId].running = setInterval(() => {
          this.projectiles[lightningBoltId].y += directionY;
          this.projectiles[lightningBoltId].x += directionX;
          if (this.projectiles[lightningBoltId].y < 0
            || this.projectiles[lightningBoltId].y >= projectiles.length
            || this.projectiles[lightningBoltId].x < 0
            || this.projectiles[lightningBoltId].x
            >= projectiles[this.projectiles[lightningBoltId].y].length
            || projectiles[this.projectiles[lightningBoltId].y][this.projectiles[lightningBoltId].x] !== '000') {
            clearInterval(this.projectiles[lightningBoltId].running);
            setTimeout(() => {
              projectiles[this.projectiles[lightningBoltId].y - directionY][this.projectiles[lightningBoltId].x - directionX] = '000';
              this.setState({ projectiles });
            }, 4000);
          } else {
            projectiles[this.projectiles[lightningBoltId].y - directionY][this.projectiles[lightningBoltId].x - directionX] = '000';
            projectiles[this.projectiles[lightningBoltId].y][this.projectiles[lightningBoltId].x] = '002';
            this.setState({ projectiles });
          }
        }, 1000);
      }
    }
    this.setState({ level });
  }

  render() {
    const {
      isWinner, isLoser, pokemon, ongoingGame, level,
      winner, finalDoorOpened1, finalDoorOpened2, projectiles,
    } = this.state;
    return (
      <div className="GameMultiplayer">
        {isWinner || isLoser
          ? <EndingGame className="endgame" winner={winner} isWinner={isWinner} isLoser={isLoser} pokemon={pokemon} />
          : null
        }
        <div className="gameContainer">
          <Board tiles={level.tiles} items={level.items} projectiles={projectiles} />
          <Players
            ongoingGame={ongoingGame}
            tiles={level.tiles}
            items={level.items}
            projectiles={projectiles}
            startingPositions={level.startingPositions}
            getPlayerPos={this.getPlayerPos}
            playerAction={this.playerAction}
            finalDoorOpened1={finalDoorOpened1}
            finalDoorOpened2={finalDoorOpened2}
            capacities1={this.player1.capacities}
            capacities2={this.player2.capacities}
            pokemon1={this.player1.pokemon}
            pokemon2={this.player2.pokemon}
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
