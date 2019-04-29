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
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
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
    const pokemonsCaught1Sorted = pokemonsCaught1.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj.name).indexOf(obj.name) === pos;
    });
    const pokemonsCaught2Sorted = pokemonsCaught2.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj.name).indexOf(obj.name) === pos;
    });

    const {
      value1, value2, levelsJ1, levelsJ2,
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
          <Pokedex getlevel={this.getLevelsJ1} player="player1" />
        </div>
        <div className="pokedexJ2">
          <Pokedex getlevel={this.getLevelsJ2} player="player2" />
        </div>
        <div className="mateContainer" style={{ marginRight: 80 }}>
          <div className="pokemon">
            {pokemon1 !== 'none'
              ? (
                <img
                  src={`http://pokestadium.com/sprites/xy/${pokemon1}.gif`}
                  alt={pokemon1}
                />
              )
              : (
                <img
                  src="./assets/pokemons/unknow.png"
                  alt="none"
                />
              )
            }
          </div>
          {pokemon1 !== 'none'
            ? <img alt={newvalue1} className="elem" src={`./assets/pokemons/elements/${newvalue1}.png`} />
            : undefined
          }
        </div>
        <div className="formPoke" style={{ marginRight: 110 }}>
          <form>
            <p>Pick your team mate:</p>
            <div className="list">
              <select
                size={pokemonsCaught1Sorted.length + 1}
                value={value1}
                onChange={this.handleChange1}
              >
                {pokemonsCaught1Sorted.length > 0
                  ? <option key="none" value="none">Choose a pokemon</option>
                  : <option key="none" value="none">You have 0 pokemon</option>}
                {
                  pokemonsCaught1Sorted.map(monster => (
                    <option key={monster.name} value={`${monster.type} ${monster.name}`}>
                      {monster.name}
                    </option>
                  ))
                }

              </select>
            </div>
          </form>
        </div>
        <div className="playOrBack" style={{ marginRight: 110 }}>
          <Link to={{
            pathname: '/multiplayer',
            state: {
              player1: capacity1,
              mate1: pokemon1,
              player2: capacity2,
              mate2: pokemon2,
            },
          }}
          >
            <button
              className="homeButton"
              type="button"
              size="lg"
              style={{ marginBottom: 18 }}
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
              >
                Back to menu
              </button>
            </Link>
          </div>
        </div>
        <div className="formPoke" style={{ marginRight: 80 }}>
          <form>
            <p>Pick your team mate:</p>
            <div className="list">
              <select
                size={pokemonsCaught2Sorted.length + 1}
                value={value2}
                onChange={this.handleChange2}
              >
                {pokemonsCaught2Sorted.length > 0
                  ? <option key="none" value="none">Choose a pokemon</option>
                  : <option key="none" value="none">You have 0 pokemon</option>
                }
                {
                  pokemonsCaught2Sorted.map(monster => (
                    <option key={monster.name} value={`${monster.type} ${monster.name}`}>
                      {monster.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </form>
        </div>
        <div className="mateContainer">
          <div className="pokemon">
            {pokemon2 !== 'none'
              ? (
                <img
                  src={`http://pokestadium.com/sprites/xy/${pokemon2}.gif`}
                  alt={pokemon2}
                />
              )
              : (
                <img
                  src="./assets/pokemons/unknow.png"
                  alt="none"
                />
              )
            }
          </div>
          {pokemon2 !== 'none'
            ? <img alt={newvalue2} className="elem" src={`./assets/pokemons/elements/${newvalue2}.png`} />
            : undefined
          }
        </div>
      </div>
    );
  }
}
export default DuoGame;
