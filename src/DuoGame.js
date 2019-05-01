import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pokedex from './Pokedex';
import Mate from './Mate';
import './DuoGame.css';
import ChooseMate from './ChooseMate';
import ChooseLevel from './ChooseLevel';

class DuoGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelsJ1: '',
      levelsJ2: '',
      value1: 'none',
      value2: 'none',
      pokemon: [],
      modal: false,
    };
  }

  componentWillMount() {
    this.getPokemon();
  }

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

  getMate = (mate, value) => {
    this.setState({
      [value]: mate,
    });
  }

  getPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151', {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          this.setState({
            pokemon: json.results,
            modal: false,
          });
        });
      }
    });
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
      value1, value2, levelsJ1, levelsJ2, pokemon, modal,
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
      switch (pokemon1) {
        case 'nidoran-f':
          pokemon1 = 'nidoranf';
          break;
        case 'nidoran-m':
          pokemon1 = 'nidoranm';
          break;
        default:
          break;
      }
    }
    if (value2 !== 'none') {
      [newvalue2, pokemon2] = value2.split(' ');
      level2 = levelsJ2[newvalue2].level;
      capacity2 = `${newvalue2}${level2}`;
      switch (pokemon2) {
        case 'nidoran-f':
          pokemon2 = 'nidoranf';
          break;
        case 'nidoran-m':
          pokemon2 = 'nidoranm';
          break;
        default:
          break;
      }
    }
    return (
      <div className="DuoHome">
        <div className="pokedexJ1">
          <Pokedex pokemon={pokemon} getlevel={this.getLevelsJ1} player="player1" />
        </div>
        <div className="pokedexJ2">
          <Pokedex pokemon={pokemon} getlevel={this.getLevelsJ2} player="player2" />
          {modal
            ? (
              <ChooseLevel
                player1={capacity1}
                mate1={pokemon1}
                player2={capacity2}
                mate2={pokemon2}
              />
            )
            : (undefined)
          }
        </div>
        <Mate pokemon={pokemon1} newvalue={newvalue1} level={level1} />
        <ChooseMate pokemonsCaught={pokemonsCaught1} value="value1" getMate={this.getMate} />
        <div className="playOrBack" style={{ marginRight: '7vw' }}>
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
        <ChooseMate pokemonsCaught={pokemonsCaught2} value="value2" getMate={this.getMate} />
        <Mate pokemon={pokemon2} newvalue={newvalue2} level={level2} />
      </div>
    );
  }
}
export default DuoGame;
