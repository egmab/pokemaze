import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.canMove = true;
    this.action = this.action.bind(this);
    const posX = props.startingPositions.player1.x;
    const posY = props.startingPositions.player1.y;
    this.posX = posX;
    this.posY = posY;
    this.img = 'charBottom';
    this.state = {
      posX: props.startingPositions.player1.x,
      posY: props.startingPositions.player1.y,
      img: 'charBottom',
      pixelsPerTile: 48,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.action, false);

    // document.addEventListener('keyUp', this.anim, false);

    setInterval(() => {
      this.canMove = true;
      this.refreshRender();
    }, 30);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.action, false);
  }

  refreshRender() {
    this.setState({
      posX: this.posX,
      posY: this.posY,
      img: this.img,
    });
  }

  //    Checks if tile is an obstacle in the level after a move (tiles named "500"+)
  checkTile(x, y) {
    const { tiles } = this.props;
    const { posX, posY } = this.state;
    if (parseInt(tiles[posY + y][posX + x], 10) >= 500) {
      return false;
    }
    return true;
  }

  /* walk()
  {
    setInterval(() => {
      if(this.state.img === 'charRight' )
      this.setState({ img: 'charRightFeet' });
      else
      this.setState({ img: 'charRight' });
    }, 1000);
  } */

  action(event) {
    const { ongoingGame } = this.props;
    const { tiles } = this.props;
    // MOVES

    /* if(event.keyCode === 39 && this.state.count === 0){
      this.setState({count: this.state.count =  this.state.count + 1});
      this.walk();
    } */

    if (this.canMove && ongoingGame
      && (event.keyCode === 39
        || event.keyCode === 37
        || event.keyCode === 40
        || event.keyCode === 38
      )) {
      this.canMove = false;
      // Move right
      if (event.keyCode === 39) {
        this.img = 'charRight';
        if (this.posX + 1 < tiles[this.posY].length
          && this.checkTile(1, 0)) {
          this.posX += 1;
        }
      }
      // Move left
      if (event.keyCode === 37) {
        this.img = 'charLeft';
        if (this.posX > 0 && this.checkTile(-1, 0)) {
          this.posX -= 1;
        }
      }
      // Move down
      if (event.keyCode === 40) {
        this.img = 'charBottom';
        if (this.posY + 1 < tiles.length && this.checkTile(0, 1)) {
          this.posY += 1;
        }
      }
      // Move up
      if (event.keyCode === 38) {
        this.img = 'charTop';
        if (this.posY > 0 && this.checkTile(0, -1)) {
          this.posY -= 1;
        }
      }

      const { getPlayerPos } = this.props;
      getPlayerPos(this.posX, this.posY);
    }
    // To do: other actions
  }

  render() {
    const {
      img, posX, posY, pixelsPerTile,
    } = this.state;
    //  Player CSS
    const playerStyle = {
      position: 'absolute',
      zIndex: 3,
      backgroundImage: `url(./assets/characters/${img}.png`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: '38px',
      width: '38px',
      marginTop: '-0.5vh',
      marginLeft: '0.2vh',
      transitionDuration: '500ms',
      // To do: cleaner calculation
      top: `${posY * pixelsPerTile}px`,
      left: `${11 + posX * pixelsPerTile}px`,
    };

    return (
      <div className="player">
        <div style={playerStyle} />
      </div>

    );
  }
}

export default Player;
