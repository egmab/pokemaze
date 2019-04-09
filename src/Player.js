import React, { Component } from 'react';
import GeneratePokemon from './GeneratePokemon';
import DisplayPokemon from './DisplayPokemon';

class Player extends Component {
  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
    this.canMove = true;
    this.state = {
      posX: 1,
      posY: 0,
      img: 'charBottom',
      pixelsPerTile: 48,
      pokemon: { name: 'pikachu' },
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.action, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.action, false)
  }

  getPokemon() {
    const randomPokemon = Math.ceil(Math.random() * Math.floor(151))
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          pokemon: data,
        });
      });
  }

  //    Checks if tile is an obstacle in the labyrinth after a move (tiles named "500"+)
  checkTile(x, y) {
    if (parseInt(this.props.labyrinth[this.state.posY + y][this.state.posX + x]) >= 500) {
      return false;
    }
    return true;
  }

  action(event) {
    // MOVES
    if (this.canMove
      && (event.keyCode === 39
        || event.keyCode === 37
        || event.keyCode === 40
        || event.keyCode === 38
      )) {
      this.canMove = false;
      // Move right
      if (event.keyCode === 39) {
        this.setState({ img: 'charRight' });
        if (this.state.posX + 1 < this.props.labyrinth[this.state.posY].length
          && this.checkTile(1, 0)) {
          const posX = this.state.posX + 1;
          this.setState({ posX });
        }
      }
      // Move left
      if (event.keyCode === 37) {
        this.setState({ img: 'charLeft' });
        if (this.state.posX > 0 && this.checkTile(-1, 0)) {
          const posX = this.state.posX - 1;
          this.setState({ posX });
        }
      }
      // Move down
      if (event.keyCode === 40) {
        this.setState({ img: 'charBottom' });
        if (this.state.posY + 1 < this.props.labyrinth.length && this.checkTile(0, 1)) {
          const posY = this.state.posY + 1;
          this.setState({ posY });
        }
      }
      // Move up
      if (event.keyCode === 38) {
        this.setState({ img: 'charTop' });
        if (this.state.posY > 0 && this.checkTile(0, -1)) {
          const posY = this.state.posY - 1;
          this.setState({ posY });
        }
      }

      // Move delay value
      setTimeout(() => {
        this.canMove = true;
      }, 200)
      this.props.getPlayerPos(this.state.posX, this.state.posY);
    }
    // To do :
    // Activate abilities
  }

  render() {
    //  Player CSS
    const playerStyle = {
      position: 'absolute',
      zIndex: 1,
      backgroundImage: `url(./assets/characters/${this.state.img}.png`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: '48px',
      width: '48px',
      transitionDuration: '400ms',
      // To do: cleaner calculation
      top: `${this.state.posY * this.state.pixelsPerTile}px`,
      left: `${11 + this.state.posX * this.state.pixelsPerTile}px`
    };

    return (
      <div className="player">
        <div style={playerStyle} />
        <GeneratePokemon selectPokemon={() => this.getPokemon()} />
        <DisplayPokemon pokemon={this.state.pokemon} />
      </div>

    );
  }
}


export default Player;
