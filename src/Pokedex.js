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
    this.pokeMap = [];
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
    const pokemonsCaughtSorted = pokemonsCaught.filter((obj, pos, arr) => arr
      .map(mapObj => mapObj.name).indexOf(obj.name) === pos);

    /* Calcul pokémons attrapés par type */
    if (pokemonsCaughtSorted.length > 0) {
      for (let i = 0; i < pokemonsCaughtSorted.length; i += 1) {
        pokemonType = pokemonsCaughtSorted[i].type;
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
      if (this.types[this.typeArray[j]].number
        === Math.ceil(this.types[this.typeArray[j]].max / 2)) {
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

    if (event.target.value === 'all') {
      if (eachPokemon) {
        for (let i = 0; i < eachPokemon.length; i += 1) {
          eachPokemon[i].style.display = 'block';
        }
      }
    }
  }


  render() {
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
    const pokemonsCaughtSorted = pokemonsCaught.filter((obj, pos, arr) => arr
      .map(mapObj => mapObj.name).indexOf(obj.name) === pos);

    const { pokemon } = this.props;
    this.pokeMap = pokemon.map((monster, index) => (
      <Pokemon
        key={monster.name}
        id={index + 1}
        pokemonName={monster.name}
        pokemonsCaught={pokemonsCaught}
        player={player}
        isClicked={this.isClicked}
      />
    ));

    return (
      <div className="global-container">
        <h2>
          {actualPlayer}
          &apos;s pokedex
        </h2>
        <div className="pokemonSearchBar">
          <div className="searchPoke">
            <div className="buttons">
              <button
                type="button"
                style={{
                  backgroundImage: 'url(./assets/pokeball.png)',
                }}
                className="imgelemArray"
                value="all"
                onClick={this.changeType}
              />
            </div>
            <div className="numbers">
              <span>
                All
              </span>
              <span className="starPoke">
                {pokemonsCaughtSorted.length}
                /151
              </span>
            </div>
          </div>
          {this.typeArray.map((type, index) => (
            <div className="searchPoke" key={`typeId-${index + 1}`}>
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
          {this.pokeMap}
        </div>
      </div>
    );
  }
}

export default Pokedex;
