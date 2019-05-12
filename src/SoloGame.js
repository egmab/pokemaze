import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pokedex from './Pokedex';
import './SoloGame.css';

class SoloGame extends Component {
  // <Game level={this.selectedLevel} levelName={this.levelName}
  render() {
    const soloLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('GameData')).default.levels.solo);
    const customLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('PokemazeCustomLevels')));
    return (


      <div className="soloHome">
        <div className="levels">
          <h1>Choose your level</h1>
          <div className="SoloLevels">
            <h3>Solo levels</h3>
            <div className="buttonSolo">
              {
                soloLevels.map((level, index) => (
                  <Link
                    to={{
                      pathname: '/game',
                      state: {
                        levelsolo: level,
                        leveltype: 'default',
                      },
                    }}
                    key={`linksolo-${index + 1}`}
                  >
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
                  </Link>
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
                customLevels.map((level, index) => (
                  <Link
                    to={{
                      pathname: '/game',
                      state: {
                        levelsolo: level,
                        leveltype: 'custom',
                      },
                    }}
                    key={`linkcustom-${index + 1}`}
                  >
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
                  </Link>
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
          <Pokedex getlevel={this.getLevelsJ1} player="player1" game="solo" />
        </div>
      </div>
    );
  }
}

export default SoloGame;
