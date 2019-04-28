import React, { Component } from 'react';
import Player from './Player';
import Capacities from './Capacities';

class Players extends Component {
  constructor(props) {
    super(props);
    // Initiate abilities timers
    // Ability timer = 10s - (ability level * 2)
    // Uses a string ("punch2" -> punch level 2 -> 10 - 2*2 -> 6s cooldown)
    this.player1timers = [];
    this.player2timers = [];
    for (let i = 0; i < props.capacities1.length; i += 1) {
      this.player1timers.push(10 - (parseInt(props.capacities1[i].slice(-1), 10) * 2));
    }
    for (let i = 0; i < props.capacities2.length; i += 1) {
      this.player2timers.push(10 - (parseInt(props.capacities2[i].slice(-1), 10) * 2));
    }
    this.state = {
      player1: {
        x: props.startingPositions.player1.x,
        y: props.startingPositions.player1.y,
        gettingTargeted: null,
      },
      player2: {
        x: props.startingPositions.player2.x,
        y: props.startingPositions.player2.y,
        gettingTargeted: null,
      },
      player1timers: [...this.player1timers],
      player2timers: [...this.player2timers],
    };
  }

  componentWillMount() {
    setInterval(() => this.updateTimers(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimers);
  }

  updateTimers = () => {
    const { player1timers, player2timers } = this.state;
    for (let i = 0; i < player1timers.length; i += 1) {
      if (player1timers[i] > 0) {
        player1timers[i] -= 1;
      }
    }
    for (let i = 0; i < player2timers.length; i += 1) {
      if (player2timers[i] > 0) {
        player2timers[i] -= 1;
      }
    }
    this.setState({ player1timers, player2timers });
  }

  multiplayerCoordinates = (x, y, player) => {
    this.setState({
      [player]: { x, y },
    });
  }

  multiplayerActions = (player, enemy, capacity, directionX, directionY) => {
    const { player1timers, player2timers } = this.state;
    if (player === 'player1') {
      // eslint-disable-next-line prefer-destructuring
      player1timers[0] = this.player1timers[0];
      this.setState({ player1timers });
    }
    if (player === 'player2') {
      // eslint-disable-next-line prefer-destructuring
      player2timers[0] = this.player2timers[0];
      this.setState({ player2timers });
    }
    if (capacity) {
      // Traps/projectiles don't directly affect other player
      // => callback in MultiplayerGame to alter matrices
      if (capacity.slice(0, -1) !== 'fire' && capacity.slice(0, -1) !== 'electric') {
        this.setState({
          [enemy]: {
            gettingTargeted: {
              byCapacity: capacity,
              directionX,
              directionY,
            },
          },
        });
      }
    }
  }

  resetActions = (player) => {
    this.setState({ [player]: { gettingTargeted: null } });
  }

  render() {
    const {
      ongoingGame, tiles, items, startingPositions, getPlayerPos, playerAction,
      finalDoorOpened1, finalDoorOpened2, capacities1, capacities2,
    } = this.props;
    const {
      player1, player2, player1timers, player2timers,
    } = this.state;
    return (
      <div>
        <Player
          ongoingGame={ongoingGame}
          tiles={tiles}
          items={items}
          startingPositions={startingPositions.player1}
          getPlayerPos={getPlayerPos}
          playerAction={playerAction}
          finalDoorOpened={finalDoorOpened1}
          player={player1}
          enemy={player2}
          multiplayerActions={this.multiplayerActions}
          resetActions={this.resetActions}
          multiplayerCoordinates={this.multiplayerCoordinates}
          capacities={capacities1}
          timers={player1timers}
          gameMode="multiplayer"
          playerNumber="player1"
          className="player"
        />
        <Player
          ongoingGame={ongoingGame}
          tiles={tiles}
          items={items}
          startingPositions={startingPositions.player2}
          getPlayerPos={getPlayerPos}
          playerAction={playerAction}
          finalDoorOpened={finalDoorOpened2}
          player={player2}
          enemy={player1}
          multiplayerActions={this.multiplayerActions}
          resetActions={this.resetActions}
          multiplayerCoordinates={this.multiplayerCoordinates}
          capacities={capacities2}
          timers={player2timers}
          gameMode="multiplayer"
          playerNumber="player2"
          className="player"
        />
        <Capacities
          playerNumber="player1"
          capacities={capacities1}
          timers={player1timers}
          maxtimers={this.player1timers}
        />
        <Capacities
          playerNumber="player2"
          capacities={capacities2}
          timers={player2timers}
          maxtimers={this.player2timers}
        />
      </div>

    );
  }
}

export default Players;
