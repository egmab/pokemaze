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

  selectCustomLevel = (event) => {
    this.selectedLevel = JSON.parse(localStorage.getItem('PokemazeCustomLevels'))[event.target.value];
    this.setState({ selectionDone: true });
  }

  render() {
    const { selectionDone } = this.state;
    const soloLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('GameData')).default.levels.solo);
    const customLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('PokemazeCustomLevels')));
    return (
      selectionDone
        ? <Game level={this.selectedLevel} />
        : (
          <div className="home">
            <div className="SoloLevels">
              <p style={{ fontSize: '150%' }}>Solo levels</p>
              {
                soloLevels.map((level, index) => (
                  <button
                    className="homeButton"
                    style={{ marginRight: 20 }}
                    type="button"
                    key={`levelId-${index + 1}`}
                    value={level}
                    onClick={this.selectLevel}
                  >
                    {level}
                  </button>
                ))
              }
            </div>
            <div className="CustomLevels">
              <p style={{ fontSize: '150%' }}>
                Custom levels
                <span style={{ color: 'darkred' }}>
                  You can
                  {"'"}
                  t earn new Pokemons in this mode
                </span>
              </p>
              {
                selectionDone
                  ? null
                  : customLevels.map((level, index) => (
                    <button
                      className="homeButton"
                      type="button"
                      key={`customLevelId-${index + 1}`}
                      value={level}
                      onClick={this.selectCustomLevel}
                    >
                      {level}
                    </button>
                  ))
              }
            </div>
          </div>
        )
    );
  }
}

export default SoloGame;
