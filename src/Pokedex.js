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
    const { pokemon } = this.state;
    return (
      <div className="pokemon-container">
        <div className="pokemonSearchBar">
          <div>
            <table className="typeArray">
              <tr className="arrayFirstRow">
                <td>type</td>
                <td>obtenu</td>
                <td>type</td>
                <td>obtenu</td>
                <td>type</td>
                <td>obtenu</td>
              </tr>
              <tr>
                <td>eau</td>
                <td>/28</td>
                <td>normal</td>
                <td>/22</td>
                <td>poison</td>
                <td>/14</td>
              </tr>
              <tr>
                <td>plante</td>
                <td>/12</td>
                <td>feu</td>
                <td>/12</td>
                <td>insecte</td>
                <td>/12</td>
              </tr>
              <tr>
                <td>electric</td>
                <td>/9</td>
                <td>pierre</td>
                <td>/9</td>
                <td>sol</td>
                <td>/8</td>
              </tr>
              <tr>
                <td>psy</td>
                <td>/8</td>
                <td>combat</td>
                <td>/7</td>
                <td>fantome</td>
                <td>/3</td>
              </tr>
              <tr>
                <td>dragon</td>
                <td>/3</td>
                <td>fee</td>
                <td>/2</td>
                <td>glace</td>
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
            />
          ))
        }
      </div>
    );
  }
}

export default Pokedex;
