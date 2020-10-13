import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pokedex from './Pokedex';
import Mate from './Mate';
import './DuoGame.css';
import ChooseLevel from './ChooseLevel';

class DuoGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsJ1: '',
      levelsJ2: '',
      value1: 'none',
      value2: 'none',
      modal: false,
    };
  }

  componentWillMount() {
    this.setState({
      modal: false,
    });
  }

  getLevelsJ1 = (level) => {
    this.setState({
      levelsJ1: level,
    });
  }

  getPokeJ1 = (chosenPoke) => {
    this.setState({
      value1: chosenPoke,
    });
  }

  getLevelsJ2 = (level) => {
    this.setState({
      levelsJ2: level,
    });
  }

  getPokeJ2 = (chosenPoke) => {
    this.setState({
      value2: chosenPoke,
    });
  }


  closeModal = () => {
    this.setState({
      modal: false,
    });
  }

  render() {
    const {
      value1, value2, levelsJ1, levelsJ2, modal,
    } = this.state;
    let level1;
    let capacity1 = 'none';
    let level2;
    let capacity2 = 'none';
    let newvalue1 = 'none';
    let newvalue2 = 'none';
    let pokemon1 = 'none';
    let pokemon2 = 'none';

    if (value1 !== 'none') {
      [newvalue1, pokemon1] = value1.split(' ');
      level1 = levelsJ1[newvalue1].level;
      capacity1 = `${newvalue1}${level1}`;
    }
    if (value2 !== 'none') {
      [newvalue2, pokemon2] = value2.split(' ');
      level2 = levelsJ2[newvalue2].level;
      capacity2 = `${newvalue2}${level2}`;
    }
    return (
      <div className="DuoHome">
        <div className="pokedexJ1">
          <Pokedex getPoke={this.getPokeJ1} getlevel={this.getLevelsJ1} player="player1" game="multi" />
        </div>
        <div className="pokedexJ2">
          <Pokedex getPoke={this.getPokeJ2} getlevel={this.getLevelsJ2} player="player2" game="multi" />
          {modal
            ? (
              <ChooseLevel
                player1={capacity1}
                mate1={pokemon1}
                player2={capacity2}
                mate2={pokemon2}
                closeModal={this.closeModal}
              />
            )
            : (undefined)
          }
        </div>
        <div className="menuDuo">
          <Mate player="J1" pokemon={pokemon1} newvalue={newvalue1} level={level1} />
          <div className="playOrBack">
            <button
              className="homeButton"
              type="button"
              size="lg"
              style={{ marginBottom: 18 }}
              onClick={() => this.setState({ modal: true })}
            >
              PLAY
            </button>

            <div>
              <Link to="/">
                <button
                  className="backButton"
                  type="button"
                  size="lg"
                >
                  Back to menu
                </button>
              </Link>
            </div>
          </div>
          <Mate player="J2" pokemon={pokemon2} newvalue={newvalue2} level={level2} />
        </div>
      </div>
    );
  }
}
export default DuoGame;
