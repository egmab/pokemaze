import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
    this.canMove = true;
    this.state = {
      posX: props.startingPositions.player1.x,
      posY: props.startingPositions.player1.y,
      img: 'charBottom',
      pixelsPerTile: 48,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.action, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.action, false);
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

  action(event) {
    let { posX, posY } = this.state;
    const { tiles } = this.props;
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
        if (posX + 1 < tiles[posY].length
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
        if (posY + 1 < tiles.length && this.checkTile(0, 1)) {
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

      // Move delay value
      setTimeout(() => {
        this.canMove = true;
      }, 200);
      const { getPlayerPos } = this.props;
      getPlayerPos(posX, posY);
    }
    // To do :
    // Activate abilities
  }

  render() {
    const {
      img, posX, posY, pixelsPerTile,
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
      transitionDuration: '400ms',
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
