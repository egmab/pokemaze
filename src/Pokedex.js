import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import Pokemon from './Pokemon';
import './Pokedex.css';


class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
    };
  }

  componentWillMount() {
    this.getPokemon();
  }

  getPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151', {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          this.setState({
            pokemon: json.results,
          });
        });
      }
    });
  }

  render() {
    const actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer'));
    let actualStorage = '';
    let pokemonsCaught = '';
    if (localStorage.getItem(actualPlayer)) {
      actualStorage = JSON.parse(localStorage.getItem(actualPlayer));
      pokemonsCaught = actualStorage.pokemons;
    }

    const { pokemon } = this.state;
    return (
      <div className="pokemon-container">
        <div className="pokemonSearchBar">
          <div className="arrayBox">
            <table className="typeArray">
              <tr className="arrayFirstRow">
                <td>type</td>
                <td>obtenu</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/water.png" alt="water" /></td>
                <td>/28</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/grass.png" alt="grass" /></td>
                <td>/12</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/electric.png" alt="electric" /></td>
                <td>/9</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/psychic.png" alt="psychic" /></td>
                <td>/8</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/dragon.png" alt="dragon" /></td>
                <td>/3</td>
              </tr>
            </table>
            <table className="typeArray">
              <tr className="arrayFirstRow">
                <td>type</td>
                <td>obtenu</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/normal.png" alt="normal" /></td>
                <td>/22</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/fire.png" alt="fire" /></td>
                <td>/12</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/rock.png" alt="rock" /></td>
                <td>/9</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/fighting.png" alt="fighting" /></td>
                <td>/7</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/fairy.png" alt="fairy" /></td>
                <td>/2</td>
              </tr>
            </table>
            <table className="typeArray">
              <tr className="arrayFirstRow">
                <td>type</td>
                <td>obtenu</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/poison.png" alt="poison" /></td>
                <td>/14</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/bug.png" alt="bug" /></td>
                <td>/12</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/ground.png" alt="ground" /></td>
                <td>/8</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/ghost.png" alt="ghost" /></td>
                <td>/3</td>
              </tr>
              <tr>
                <td><img className="imgelemArray" src="./assets/pokemons/elements/ice.png" alt="ice" /></td>
                <td>/2</td>
              </tr>
            </table>
          </div>
        </div>
        {
          pokemon.map((monster, index) => (
            <Pokemon
              key={monster.name}
              id={index + 1}
              pokemonName={monster.name}
              pokemonsCaught={pokemonsCaught}
            />
          ))
        }
      </div>
    );
  }
}

export default Pokedex;
