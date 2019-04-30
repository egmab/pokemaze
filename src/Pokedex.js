import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import Pokemon from './Pokemon';
import './Pokedex.css';


let actualPlayer;
let actualStorage = '';
let pokemonsCaught = '';
let pokemonType;


let pokemonContainer = 'pokemon-container1';
class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
    };
    this.typeArray = ['water', 'fire', 'grass', 'electric',
      'psychic', 'dragon', 'normal', 'rock', 'fighting', 'fairy',
      'bug', 'ground', 'poison', 'ghost', 'ice'];
    this.types = {
      water: { number: 0, max: 28, level: 0 },
      fire: { number: 0, max: 12, level: 0 },
      grass: { number: 0, max: 12, level: 0 },
      electric: { number: 0, max: 9, level: 0 },
      psychic: { number: 0, max: 8, level: 0 },
      dragon: { number: 0, max: 3, level: 0 },
      normal: { number: 0, max: 22, level: 0 },
      rock: { number: 0, max: 9, level: 0 },
      fighting: { number: 0, max: 7, level: 0 },
      fairy: { number: 0, max: 2, level: 0 },
      bug: { number: 0, max: 12, level: 0 },
      ground: { number: 0, max: 8, level: 0 },
      poison: { number: 0, max: 14, level: 0 },
      ghost: { number: 0, max: 3, level: 0 },
      ice: { number: 0, max: 2, level: 0 },
    };
  }

  componentWillMount() {
    this.getPokemon();
  }

  componentDidMount() {
    const { player } = this.props;

    actualPlayer = 'Player';
    if (player === 'player1') {
      actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer'));
    }
    if (player === 'player2') {
      actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer2'));
    }

    if (localStorage.getItem(actualPlayer)) {
      actualStorage = JSON.parse(localStorage.getItem(actualPlayer));
      pokemonsCaught = actualStorage.pokemons;
    }

    /* Calcul pokémons attrapés par type */
    if (pokemonsCaught.length > 0) {
      for (let i = 0; i < pokemonsCaught.length; i += 1) {
        pokemonType = pokemonsCaught[i].type;
        for (let j = 0; j < this.typeArray.length; j += 1) {
          if (this.typeArray[j] === pokemonType) {
            this.types[pokemonType].number += 1;
          }
        }
      }
    }
    /* Calcul du niveau */
    for (let j = 0; j < this.typeArray.length; j += 1) {
      if (this.types[this.typeArray[j]].number > 0) {
        this.types[this.typeArray[j]].level = 1;
      }
      if (this.types[this.typeArray[j]].number === Math.ceil(this.types[this.typeArray[j]].max / 2)) {
        this.types[this.typeArray[j]].level = 2;
      }
      if (this.types[this.typeArray[j]].number === this.types[this.typeArray[j]].max) {
        this.types[this.typeArray[j]].level = 3;
      }
    }
    const { getlevel } = this.props;
    if (getlevel) {
      getlevel(this.types);
    }
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

  changeType = (event) => {
    let pokemonsClicked = '';
    const { player } = this.props;
    let allPokemons = '';

    if (player === 'player1') {
      pokemonsClicked = document.getElementsByClassName(event.target.value);
      allPokemons = document.getElementById('pokemon-container1');
    }
    if (player === 'player2') {
      const eventTarget = event.target.value;
      const targetClass = `${eventTarget}2`;
      pokemonsClicked = document.getElementsByClassName(targetClass);
      allPokemons = document.getElementById('pokemon-container2');
    }
    const eachPokemon = allPokemons.childNodes;

    if (eachPokemon) {
      for (let i = 0; i < eachPokemon.length; i += 1) {
        eachPokemon[i].style.display = 'none';
      }
    }
    for (let i = 0; i < pokemonsClicked.length; i += 1) {
      pokemonsClicked[i].style.display = 'block';
    }
  }

  render() {
    const { pokemon } = this.state;
    const { player } = this.props;

    actualPlayer = 'Player';
    if (player === 'player1') {
      actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer'));
    }
    if (player === 'player2') {
      actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer2'));
    }

    if (localStorage.getItem(actualPlayer)) {
      actualStorage = JSON.parse(localStorage.getItem(actualPlayer));
      pokemonsCaught = actualStorage.pokemons;
    }
    if (player === 'player1') {
      pokemonContainer = 'pokemon-container1';
    }
    if (player === 'player2') {
      pokemonContainer = 'pokemon-container2';
    }

    return (
      <div className="global-container">
        <h2>
          {actualPlayer}
          &apos;s pokedex
        </h2>
        <div className="pokemonSearchBar">
          {this.typeArray.map(type => (
            <div className="searchPoke">
              <div className="buttons">
                <button
                  type="button"
                  style={{
                    backgroundImage: `url(./assets/pokemons/elements/${type}.png)`,
                  }}
                  className="imgelemArray"
                  value={type}
                  onClick={this.changeType}
                />
              </div>
              <div className="numbers">
                <span>
                  {this.types[type].number}
                  {' '}
                  /
                  {this.types[type].max}
                </span>
                <span className="starPoke">
                  <img
                    src={`./assets/pokemons/level${this.types[type].level}.png`}
                    alt={this.types[type].level}
                  />
                </span>
              </div>
            </div>
          ))
          }
        </div>
        <div id={pokemonContainer}>
          {
            pokemon.map((monster, index) => (
              <Pokemon
                key={monster.name}
                id={index + 1}
                pokemonName={monster.name}
                pokemonsCaught={pokemonsCaught}
                player={player}
                isClicked={this.isClicked}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Pokedex;
