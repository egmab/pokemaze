import React, { Component } from 'react';
import MultiplayerGame from './MultiplayerGame';

class Multiplayer extends Component {
  constructor(props) {
    super(props);
    this.player1 = 'Player 1';
    this.player2 = 'Player 2';
    this.selection = '001';
  }

  render() {
    let capacity1 = 'none';
    let capacity2 = 'none';
    let pokemon1 = 'none';
    let pokemon2 = 'none';
    const { location } = this.props;
    if (location.state) {
      capacity1 = location.state.player1;
      capacity2 = location.state.player2;
      pokemon1 = location.state.mate1;
      pokemon2 = location.state.mate2;
    }
    const selectedLevel = JSON.parse(localStorage.getItem('GameData')).default.levels.multiplayer[this.selection];
    return (
      <div>
        <MultiplayerGame
          level={selectedLevel}
          player1={this.player1}
          player2={this.player2}
          capacity1={capacity1}
          capacity2={capacity2}
          pokemon1={pokemon1}
          pokemon2={pokemon2}
        />
      </div>
    );
  }
}


export default Multiplayer;
