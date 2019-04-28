import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Game from './Game';
import Pokedex from './Pokedex';
import './SoloGame.css';

class SoloGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionDone: false,
      levelsJ1: '',
    };
  }

  getLevelsJ1 = (level) => {
    this.setState({
      levelsJ1: level,
    });
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
              <h1>Choose your level</h1>
              <div className="SoloLevels">
                <h3>Solo levels</h3>
                <div className="buttonSolo">
                  {
                    soloLevels.map((level, index) => (
                      <button
                        className="homeButton"
                        style={{ marginRight: 5 }}
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
              </div>
              <div className="CustomLevels">
                <h3>Custom levels</h3>
                <p>
                  You can
                  {"'"}
                  t earn new Pokemons in this mode
                </p>
                <div className="buttonCustom">
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
                          style={{ marginRight: 5 }}
                        >
                          {level}
                        </button>
                      ))
                  }
                </div>
              </div>
              <div className="homeContainer">

                <button
                  className="backButton"
                  type="button"
                  size="lg"
                >
                  <Link to="/">
                    Back to menu
                  </Link>
                </button>

              </div>

            </div>
            <div className="pokedexJ1solo">
              <Pokedex getlevel={this.getLevelsJ1} player="player1" />
            </div>
          </div>
        )
    );
  }
}

export default SoloGame;
