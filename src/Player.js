import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.canMove = true;
    this.action = this.action.bind(this);
    const posX = props.startingPositions.x;
    const posY = props.startingPositions.y;
    this.posX = posX;
    this.posY = posY;
    this.img = 'charBottom';
    this.targetedTileX = this.posX;
    this.targetedTileY = this.posY + 1;
    // Define buttons for each player
    if (props.playerNumber === 'player1') {
      this.upButton = 38;
      this.downButton = 40;
      this.leftButton = 37;
      this.rightButton = 39;
    } else if (props.playerNumber === 'player2') {
      this.upButton = 90;
      this.downButton = 83;
      this.leftButton = 81;
      this.rightButton = 68;
    }
    this.state = {
      posX: props.startingPositions.x,
      posY: props.startingPositions.y,
      img: 'charBottom',
      pixelsPerTile: 48,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.action, false);
    // document.addEventListener('keyUp', this.anim, false);

    // Refresh render
    this.interval = setInterval(() => {
      this.canMove = true;
      this.refreshRender();
    }, 50);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.action, false);
    clearInterval(this.interval);
  }

  refreshRender() {
    this.setState({
      posX: this.posX,
      posY: this.posY,
      img: this.img,
    });
  }

  //    Checks if tile is an obstacle in the level after a move
  // => tiles named "500"+ and items named "900"+
  // AND levers (items 700 to 799)
  // AND doors not activated by levers (even numbers between 800 and 899)
  checkTile(x, y) {
    const { tiles, items } = this.props;
    const { posX, posY } = this.state;
    if (parseInt(tiles[posY + y][posX + x], 10) >= 500
      || parseInt(items[posY + y][posX + x], 10) >= 900
      || (parseInt(items[posY + y][posX + x], 10) >= 700
        && parseInt(items[posY + y][posX + x], 10) <= 799)
      || (parseInt(items[posY + y][posX + x], 10) >= 800
        && parseInt(items[posY + y][posX + x], 10) <= 899
        && parseInt(items[posY + y][posX + x], 10) % 2 === 0)
    ) {
      return false;
    }
    return true;
  }

  // Change the position of player when trap is active
  traps(x, y) {
    const { tiles, startingPositions } = this.props;
    if ((parseInt(tiles[y][x], 10) >= 400
      && parseInt(tiles[y][x], 10) <= 499)
      || parseInt(tiles[y][x], 10) === 9) {
      this.posX = startingPositions.x;
      this.posY = startingPositions.y;
    }
  }

  action(event) {
    const {
      ongoingGame, tiles, items, getPlayerPos, playerNumber,
    } = this.props;
    const { posX, posY } = this.state;
    // MOVES
    if (this.canMove && ongoingGame
      && (event.keyCode === this.upButton
        || event.keyCode === this.downButton
        || event.keyCode === this.leftButton
        || event.keyCode === this.rightButton
      )) {
      this.canMove = false;
      // Move right
      if (event.keyCode === this.rightButton) {
        this.img = 'charRight';
        if (this.posX + 1 < tiles[this.posY].length
          && this.checkTile(1, 0)) {
          this.posX += 1;
        }
      }
      // Move left
      if (event.keyCode === this.leftButton) {
        this.img = 'charLeft';
        if (this.posX > 0 && this.checkTile(-1, 0)) {
          this.posX -= 1;
        }
      }
      // Move down
      if (event.keyCode === this.downButton) {
        this.img = 'charBottom';
        if (this.posY + 1 < tiles.length && this.checkTile(0, 1)) {
          this.posY += 1;
        }
      }
      // Move up
      if (event.keyCode === this.upButton) {
        this.img = 'charTop';
        if (this.posY > 0 && this.checkTile(0, -1)) {
          this.posY -= 1;
        }
      }
      this.traps(posX, posY);
      // Callback : game gets new position of the player
      getPlayerPos(this.posX, this.posY, playerNumber);
    }
    // ACTION KEY (spacebar)
    if (event.keyCode === 32) {
      // Sets coordinates of the targeted tile
      switch (this.img) {
        case 'charTop': {
          this.targetedTileX = this.posX;
          this.targetedTileY = this.posY - 1;
          break;
        }
        case 'charLeft': {
          this.targetedTileX = this.posX - 1;
          this.targetedTileY = this.posY;
          break;
        }
        case 'charRight': {
          this.targetedTileX = this.posX + 1;
          this.targetedTileY = this.posY;
          break;
        }
        default: {
          this.targetedTileX = this.posX;
          this.targetedTileY = this.posY + 1;
          break;
        }
      }
      // Checks if targeted tile is out of the map
      if (this.targetedTileX >= 0
        && this.targetedTileY >= 0
        && this.targetedTileY < tiles.length
        && this.targetedTileX < tiles[this.targetedTileY].length
      ) {
        // Activate lever if there is any on tile
        if (parseInt(items[this.targetedTileY][this.targetedTileX], 10) >= 700
          && parseInt(items[this.targetedTileY][this.targetedTileX], 10) <= 799) {
          const { playerAction } = this.props;
          // Callback to Game
          playerAction(this.targetedTileY, this.targetedTileX);
        }
        this.targetedTileX = null;
        this.targetedTileY = null;
      }
    }
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
