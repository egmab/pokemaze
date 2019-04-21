import React, { Component } from 'react';
import Game from './Game';

class SoloGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionDone: false,
    };
  }

  selectLevel = (event) => {
    this.selectedLevel = JSON.parse(localStorage.getItem('GameData')).default.levels.solo[event.target.value];
    this.setState({ selectionDone: true });
  }

  render() {
    const { selectionDone } = this.state;
    const soloLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('GameData')).default.levels.solo);
    const customLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('GameData')).default.levels.customLevels);
    return (
      <div className="home">
        {
          selectionDone
            ? <Game level={this.selectedLevel} />
            : soloLevels.map((level, index) => (
              <button className="homeButton" type="button" key={`levelId-${index + 1}`} value={level} onClick={this.selectLevel}>
                {level}
              </button>
            ))
        }
        {
          selectionDone
            ? null
            : customLevels.map((level, index) => (
              <button className="homeButton" type="button" key={`customLevelId-${index + 1}`} value={level} onClick={this.selectLevel}>
                {level}
              </button>
            ))
        }
      </div>
    );
  }
}

export default SoloGame;
