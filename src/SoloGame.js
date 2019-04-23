import React, { Component } from 'react';
// import * as Labyrinths from './labyrinths.json';
// import * as Items from './items.json';
// TO DO : using data.json instead of labyrinths and items
import * as GameData from './gameData.json';
import Game from './Game';

class SoloGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  render() {
    let theUsername = this.props.location.state.username;
    console.log("hey", theUsername)
    const selectedLevel = GameData.levels['001'];
    return (
      <div>
        <Game level={selectedLevel} />
      </div>
    );
  };
}

export default SoloGame;
