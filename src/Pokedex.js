/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './Pokedex.css';
// import { Link } from 'react-router-dom';

// const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"

const pokemonArray = new Array(152)
const array = new Array(152).fill(0)
class Pokedex extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.getPokemon();
    console.log(pokemonArray)
  }

  getPokemon() {
    for (let i = 1; i < 152; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.json())
        .then((data) => {
    pokemonArray[i] = data
  });
  }

  }
    render() {
    return (
      <div className='pokedexBack'>
        bonjour les amis 
      </div>
    )
  }
}


export default Pokedex;
