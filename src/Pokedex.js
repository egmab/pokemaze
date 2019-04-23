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
    let theUsername = this.props.location.state.oneusername;
    console.log("haah2", theUsername);
    if (localStorage.getItem(theUsername)) {
      const caughtPokemon = localStorage.getItem(theUsername);
      console.log("hello", caughtPokemon);
  }
  
    const { pokemon } = this.state;
    return (
      <div className="pokemon-container">
      <div className='pokemonSearchBar'> 
        Il est la le menu quoi
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
