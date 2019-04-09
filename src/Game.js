import React, { Component } from 'react';
import Board from './Board'
import Player from './Player'
<<<<<<< HEAD
import GeneratePokemon from './GeneratePokemon'
import DisplayPokemon from './DisplayPokemon'
import Chrono from './Chrono'

class Game extends Component {
  constructor(props) {
    super(props)
    this.getPlayerPos = this.getPlayerPos.bind(this)
    this.player = {
      posX: '',
      posY: '',
    }
    this.state= {
      pokemon: { "name": "pikachu" },
      isWinner: false,
      isLoser: false
    }
  }
  componentWillMount() {
    this.player.posX = this.props.playerX
    this.player.posY = this.props.playerY
  }

  getPlayerPos(x, y) {
    this.player.posX = x
    this.player.posY = y
    if (this.props.items[this.player.posY][this.player.posX] !== "000") {
      this.setState({
        isWinner: true
      })
      this.getPokemon()
    }
  }
  getPokemon() {
    const randomPokemon = Math.ceil(Math.random() * Math.floor(151))
    fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon)
      .then(response => response.json())
      .then(data => {
        this.setState({
          pokemon: data,
        });
      });
  }
  render() {
    return (
      <div className="Game">
        {/*    TO DO
        <Chrono />
        <Capacities />
        */}
        <Board labyrinth={this.props.labyrinth} items={this.props.items} />
        <Player labyrinth={this.props.labyrinth} getPlayerPos={this.getPlayerPos} />
         { this.state.isWinner ? <DisplayPokemon message="You win" pokemon={this.state.pokemon} />: null }
        <Chrono count={this.props.count}/>
      </div>
    );
  }
}

export default Game
