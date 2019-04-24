import React, { Component } from 'react';
import Player from './Player';

class Players extends Component {
  constructor(props) {
    super(props);
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
    };
  }


  multiplayerCoordinates = (x, y, player) => {
    this.setState({
      [player]: { x, y },
    });
  }

  multiplayerActions = (enemy, capacity, directionX, directionY) => {
    if (capacity === 'normal') {
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

  resetActions = (player) => {
    this.setState({ [player]: { gettingTargeted: null } });
  }

  render() {
    const {
      ongoingGame, tiles, items, startingPositions, getPlayerPos,
      playerAction, finalDoorOpened1, finalDoorOpened2,
    } = this.props;
    const { player1, player2 } = this.state;
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
          gameMode="multiplayer"
          playerNumber="player2"
          className="player"
        />
      </div>

    );
  }
}

export default Players;
