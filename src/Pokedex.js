/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Pokemon from './Pokemon';
import './Pokedex.css';
// import { Link } from 'react-router-dom';

// const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"


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
