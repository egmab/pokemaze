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
      //count: 0
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.action, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.action, false);
  }

  getPokemon() {
    const randomPokemon = Math.ceil(Math.random() * Math.floor(151));
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
    const { labyrinth } = this.props;
    const { posX, posY } = this.state;
    if (parseInt(labyrinth[posY + y][posX + x], 10) >= 500) {
      return false;
    }
    return true;
  }

  /*walk()
  {
    setInterval(() => {
      if(this.state.img === 'charRight' )
      this.setState({ img: 'charRightFeet' });
      else
      this.setState({ img: 'charRight' });
    }, 1000);
  }
  */

  action(event) {
    let { posX, posY } = this.state;
    const { labyrinth } = this.props;
    // MOVES
    /*if(event.keyCode === 39 && this.state.count === 0){
      this.setState({count: this.state.count =  this.state.count + 1});
      this.walk();
    }*/


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
        if (posX + 1 < labyrinth[posY].length
          && this.checkTile(1, 0)) {
          posX += 1;
          this.setState({ posX });
        }
      }
      // Move left
      if (event.keyCode === 37) {
        this.setState({ img: 'charLeft' });
        if (posX > 0 && this.checkTile(-1, 0)) {
          posX -= 1;
          this.setState({ posX });
        }
      }
      // Move down
      if (event.keyCode === 40) {
        this.setState({ img: 'charBottom' });
        if (posY + 1 < labyrinth.length && this.checkTile(0, 1)) {
          posY += 1;
          this.setState({ posY });
        }
      }
      // Move up
      if (event.keyCode === 38) {
        this.setState({ img: 'charTop' });
        if (posY > 0 && this.checkTile(0, -1)) {
          posY -= 1;
          this.setState({ posY });
        }
      }
    // To do :
     // Move delay value
     setTimeout(() => {
      this.canMove = true;
      }, 300);
      const { getPlayerPos } = this.props;
      getPlayerPos(posX, posY);
    }
    // Activate abilities
  }

  render() {
    const {
      img, posX, posY, pixelsPerTile, pokemon,
    } = this.state;
    //  Player CSS
    const playerStyle = {
      position: 'absolute',
      zIndex: 1,
      backgroundImage: `url(./assets/characters/${img}.png`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: '48px',
      width: '48px',
      marginTop: '-1.5vh',
      marginLeft: '-0.2vh',
      transitionDuration: '600ms',
      // To do: cleaner calculation
      top: `${posY * pixelsPerTile}px`,
      left: `${11 + posX * pixelsPerTile}px`,
    };

    return (
      <div className="player">
        <div style={playerStyle} />
        <GeneratePokemon selectPokemon={() => this.getPokemon()} />
        <DisplayPokemon pokemon={pokemon} />
      </div>

    );
  }
}


export default Player;
