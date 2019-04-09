import React, { Component } from 'react';
<<<<<<< HEAD
import Board from './Board'
import Player from './Player'
import DisplayPokemon from './DisplayPokemon'
import Chrono from './Chrono'

class Game extends Component {
  constructor(props) {
    super(props)
    this.getPlayerPos = this.getPlayerPos.bind(this)
    this.getTime = this.getTime.bind(this)
    this.randomPokemon = undefined
    this.player = {
      posX: '',
      posY: '',
    }
    this.state= {
      pokemon: undefined,
      isWinner: false,
      isLoser: false,
      
    }
  }

  componentWillMount() {
    this.player.posX = this.props.playerX
    this.player.posY = this.props.playerY
    this.randomPokemon = Math.ceil(Math.random() * Math.floor(151))
    this.getPokemon()
  }

  getPlayerPos(x, y) {
    this.player.posX = x
    this.player.posY = y
    if (this.props.items[this.player.posY][this.player.posX] !== "000") {
      this.setState({
        isWinner: true
      })
    }
  }

  getTime(count){
    if (count === 0){
      this.setState({
        isLoser: true
      })
    }
  }

  getPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + this.randomPokemon)
      .then(response => response.json())
      .then(data => {
        this.setState({
          pokemon: data,
        });
      });
  }
  render() {
    const { labyrinth, items, count } = this.props;
    return (
      <div className="Game">
        <Board labyrinth={this.props.labyrinth} items={this.props.items} />
        <Player labyrinth={this.props.labyrinth} getPlayerPos={this.getPlayerPos} />
        { this.state.isWinner ? <DisplayPokemon title="Congrats !" message="You win" pokemon={this.state.pokemon} />: null }
        { this.state.isLoser ? <DisplayPokemon title= "Too late !" message="You lose" pokemon={this.state.pokemon} />: null }
        <Chrono count={this.props.count} getTime={this.getTime}/>
      </div>
    );
  }
}

export default Game;
