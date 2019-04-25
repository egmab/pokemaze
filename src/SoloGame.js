import React, { Component } from 'react';
import Game from './Game';
import Pokedex from './Pokedex';
import './SoloGame.css';

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
          <div className="soloHome">
            <div className="levels">
              <div className="SoloLevels">
                <h1>Choose your level</h1>
                <h3>Solo levels</h3>
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
                <h3>Custom levels</h3>
                <p>
                  You can
                  {"'"}
                  t earn new Pokemons in this mode
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
            <div className="pokedexJ1solo">
              <Pokedex player="player1" />
            </div>
          </div>
        )
    );
  }
}

export default SoloGame;