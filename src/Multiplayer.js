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
    // eslint-disable-next-line react/destructuring-assignment
    const capacity1 = this.props.location.state.player1;
    // eslint-disable-next-line react/destructuring-assignment
    const capacity2 = this.props.location.state.player2;
    const selectedLevel = JSON.parse(localStorage.getItem('GameData')).default.levels.multiplayer[this.selection];
    return (
      <div>
        <MultiplayerGame level={selectedLevel} player1={this.player1} player2={this.player2} capacity1={capacity1} capacity2={capacity2} />
      </div>
    );
  }
}


export default Multiplayer;
