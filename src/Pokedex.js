import React, { Component } from 'react';
import Pokemon from './Pokemon';
import './Pokedex.css';
// import { Link } from 'react-router-dom';

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
    const actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer'))
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
          Il est la le menu quoi
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
