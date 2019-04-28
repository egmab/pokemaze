import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import Pokemon from './Pokemon';
import './Pokedex.css';


let actualPlayer;
let actualStorage = '';
let pokemonsCaught = '';
let pokemonType;


const pokemonContainer = 'pokemon-container1';
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
      if (this.types[this.typeArray[j]].number === Math.floor(this.types[this.typeArray[j]].max / 2)) {
        this.this.types[this.typeArray[j]].level = 2;
      }
      if (this.types[this.typeArray[j]].number === this.types[this.typeArray[j]].max) {
        this.types[this.typeArray[j]].level = 3;
      }
    }
    const { getlevel } = this.props;
    getlevel(this.types);
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


    return (
      <div className="global-container">
        <h2>
          {actualPlayer}
          &apos;s pokedex
        </h2>
        <div className="pokemonSearchBar">
          <div className="arrayBox">
            <table className="typeArray">
              <tbody>
                <tr className="arrayFirstRow">
                  <td>Type</td>
                  <td>Earned</td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/water.png)',
                      }}
                      className="imgelemArray"
                      value="water"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.water.number}
                    /28
                    {' '}
                    Level:
                    {this.types.water.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/grass.png)',
                      }}
                      className="imgelemArray"
                      value="grass"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.grass.number}
                    /12
                    {' '}
                    Level:
                    {this.types.grass.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/electric.png)',
                      }}
                      className="imgelemArray"
                      value="electric"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.electric.number}
                    /9
                    {' '}
                    Level:
                    {this.types.electric.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/psychic.png)',
                      }}
                      className="imgelemArray"
                      value="psychic"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.psychic.number}
                    /8
                    {' '}
                    Level:
                    {this.types.psychic.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/dragon.png)',
                      }}
                      className="imgelemArray"
                      value="dragon"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.dragon.number}
                    /3
                    {' '}
                    Level:
                    {this.types.dragon.level}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="typeArray">
              <tbody>
                <tr className="arrayFirstRow">
                  <td>Type</td>
                  <td>Earned</td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/normal.png)',
                      }}
                      className="imgelemArray"
                      value="normal"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.normal.number}
                    /22
                    {' '}
                    Level:
                    {this.types.normal.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/fire.png)',
                      }}
                      className="imgelemArray"
                      value="fire"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.fire.number}
                    /12
                    {' '}
                    Level:
                    {this.types.fire.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/rock.png)',
                      }}
                      className="imgelemArray"
                      value="rock"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.rock.number}
                    /9
                    {' '}
                    Level:
                    {this.types.rock.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/fighting.png)',
                      }}
                      className="imgelemArray"
                      value="fighting"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.fighting.number}
                    /7
                    {' '}
                    Level:
                    {this.types.fighting.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/fairy.png)',
                      }}
                      className="imgelemArray"
                      value="fairy"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.fairy.number}
                    /2
                    {' '}
                    Level:
                    {this.types.fairy.level}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="typeArray">
              <tbody>
                <tr className="arrayFirstRow">
                  <td>Type</td>
                  <td>Earned</td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/poison.png)',
                      }}
                      className="imgelemArray"
                      value="poison"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.poison.number}
                    /14
                    {' '}
                    Level:
                    {this.types.poison.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/bug.png)',
                      }}
                      className="imgelemArray"
                      value="bug"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.bug.number}
                    /12
                    {' '}
                    Level:
                    {this.types.bug.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/ground.png)',
                      }}
                      className="imgelemArray"
                      value="ground"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.ground.number}
                    /8
                    {' '}
                    Level:
                    {this.types.ground.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/ghost.png)',
                      }}
                      className="imgelemArray"
                      value="ghost"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.ghost.number}
                    /3
                    {' '}
                    Level:
                    {this.types.ghost.level}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="button"
                      style={{
                        backgroundImage: 'url(./assets/pokemons/elements/ice.png)',
                      }}
                      className="imgelemArray"
                      value="ice"
                      onClick={this.changeType}
                    />
                  </td>
                  <td>
                    {this.types.ice.number}
                    /2
                    {' '}
                    Level:
                    {this.types.ice.level}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
