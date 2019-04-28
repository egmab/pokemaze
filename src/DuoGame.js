import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pokedex from './Pokedex';
import './DuoGame.css';

class DuoGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsJ1: '',
      levelsJ2: '',
      value1: 'none',
      value2: 'none',
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  // fire, ice, invisibility, psychic, punch

  getLevelsJ1 = (level) => {
    this.setState({
      levelsJ1: level,
    });
  }

  getLevelsJ2 = (level) => {
    this.setState({
      levelsJ2: level,
    });
  }

  handleChange1(event) {
    this.setState({ value1: event.target.value });
  }


  handleChange2(event) {
    this.setState({ value2: event.target.value });
  }


  render() {

    const actualPlayer1 = JSON.parse(localStorage.getItem('connectedPlayer'));
    const actualPlayer2 = JSON.parse(localStorage.getItem('connectedPlayer2'));
    let pokemonsCaught1;
    let pokemonsCaught2;
    let actualStorage1;
    let actualStorage2;
    if (localStorage.getItem(actualPlayer1)) {
      actualStorage1 = JSON.parse(localStorage.getItem(actualPlayer1));
      pokemonsCaught1 = actualStorage1.pokemons;
    }
    if (localStorage.getItem(actualPlayer2)) {
      actualStorage2 = JSON.parse(localStorage.getItem(actualPlayer2));
      pokemonsCaught2 = actualStorage2.pokemons;
    }
    const {
      value1, value2, levelsJ1, levelsJ2,
    } = this.state;

    let level1;
    let capacity1 = 'none';
    let level2;
    let capacity2 = 'none';
    if (value1 !== 'none') {
      level1 = levelsJ1[value1].level;
      capacity1 = `${value1}${level1}`;
    }
    if (value2 !== 'none') {
      level2 = levelsJ2[value2].level;
      capacity2 = `${value2}${level2}`;
    }

    return (
      <div className="DuoHome">
        <div className="pokedexJ1">
          <Pokedex getlevel={this.getLevelsJ1} player="player1" />
        </div>
        <div className="pokedexJ2">
          <Pokedex getlevel={this.getLevelsJ2} player="player2" />
        </div>
        <div className="formPoke" style={{ marginRight: 100 }}>
          <form>
            <p>Pick your team mate:</p>
            <div className="list">
              <select size={pokemonsCaught1.length} value={value1} onChange={this.handleChange1}>
                {pokemonsCaught1.length > 0 ? <option value="none" selected>Choose a pokemon</option> : <option value="none" selected>You have 0 pokemon</option>}
                {
                  pokemonsCaught1.map((monster, index) => (
                    <option value={monster.type}>
                      {monster.name}
                    </option>
                  ))
                }

              </select>
            </div>
          </form>
        </div>
        <Link to={{ pathname: '/multiplayer', state: { player1: capacity1, player2: capacity2 } }}>
          <button
            className="homeButton"
            type="button"
            size="lg"
            style={{ marginRight: 100 }}
          >
            PLAY
          </button>
        </Link>
        <div>
          <Link to="/">
            <button
              className="backButton"
              type="button"
              size="lg"
              style={{ marginRight: 100 }}
            >
              Back to menu
            </button>
          </Link>
        </div>
        <div className="formPoke">
          <form>
            <p>Pick your team mate:</p>
            <div className="list">
              <select size={pokemonsCaught2.length} value={value2} onChange={this.handleChange2}>
                {pokemonsCaught2.length > 0 ? <option value="none" selected>Choose a pokemon</option> : <option value="none" selected>You have 0 pokemon</option>}
                {
                  pokemonsCaught2.map((monster, index) => (
                    <option value={monster.type}>
                      {monster.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default DuoGame;
