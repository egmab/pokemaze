import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import Pokemon from './Pokemon';
import './Pokedex.css';



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
    const types = {
      water: { number: 0, max: 28 },
      fire: { number: 0, max: 12 },
      grass: { number: 0, max: 12 },
      electric: { number: 0, max: 9 },
      psychic: { number: 0, max: 8 },
      dragon: { number: 0, max: 3 },
      normal: { number: 0, max: 22 },
      rock: { number: 0, max: 9 },
      fighting: { number: 0, max: 7 },
      fairy: { number: 0, max: 2 },
      bug: { number: 0, max: 12 },
      ground: { number: 0, max: 8 },
      poison: { number: 0, max: 14 },
      ghost: { number: 0, max: 3 },
      ice: { number: 0, max: 2 },
    }
    const { player } = this.props;

    let actualPlayer = 'Player';
    if (player === 'player1') {
      actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer'));
    }
    if (player === 'player2') {
      actualPlayer = JSON.parse(localStorage.getItem('connectedPlayer2'));
    }
    let actualStorage = '';
    let pokemonsCaught = '';
    if (localStorage.getItem(actualPlayer)) {
      actualStorage = JSON.parse(localStorage.getItem(actualPlayer));
      pokemonsCaught = actualStorage.pokemons;
    }
    const { pokemon } = this.state;
    let pokemonType;


    for (let i = 0; i < pokemonsCaught.length; i += 1) {
      if (pokemonsCaught[i].types) {
        if (pokemonsCaught[i].types[1]) {
          pokemonType = pokemonsCaught[i].types[1].type.name;
        } else {
          pokemonType = pokemonsCaught[i].types[0].type.name;
        }
      }
      console.log('type', pokemonType);
      for (let j = 0; j < this.typeArray.length; j += 1) {
        console.log(this.typeArray[j]);
        if (this.typeArray[j] === pokemonType) {
          types[pokemonType].number += 1;
        }
      }
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
          <div className="arrayBox">
            <table className="typeArray">
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
                  {types.water.number}
                  /28
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
                  {types.grass.number}
                  /12
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
                  {types.electric.number}
                  /9
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
                  {types.psychic.number}
                  /8
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
                  {types.dragon.number}
                  /3
                </td>
              </tr>
            </table>
            <table className="typeArray">
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
                  {types.normal.number}
                  /22
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
                  {types.fire.number}
                  /12
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
                  {types.rock.number}
                  /9
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
                  {types.fighting.number}
                  /7
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
                  {types.fairy.number}
                  /2
                </td>
              </tr>
            </table>
            <table className="typeArray">
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
                  {types.poison.number}
                  /14
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
                  {types.bug.number}
                  /12
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
                  {types.ground.number}
                  /8
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
                  {types.ghost.number}
                  /3
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
                  {types.ice.number}
                  /2
                </td>
              </tr>
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
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Pokedex;
