import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    if (props.gameMode) {
      this.gameMode = props.gameMode;
    }
    if (props.pokemon) {
      if (props.pokemon !== 'none') {
        this.pokemon = props.pokemon;
      }
    }
    this.canMove = true;
    this.action = this.action.bind(this);
    const posX = props.startingPositions.x;
    const posY = props.startingPositions.y;
    this.posX = posX;
    this.posY = posY;
    // Get player image
    this.targetedTileX = this.posX;
    this.targetedTileY = this.posY + 1;
    // Define buttons for each player
    if (props.playerNumber === 'player1') {
      this.charName = JSON.parse(localStorage.getItem('connectedPlayer'));
      this.upButton = 90;
      this.downButton = 83;
      this.leftButton = 81;
      this.rightButton = 68;
      this.actionButton = 16;
      this.enemy = 'player2';
    } else if (props.playerNumber === 'player2') {
      this.charName = JSON.parse(localStorage.getItem('connectedPlayer2'));
      this.upButton = 38;
      this.downButton = 40;
      this.leftButton = 37;
      this.rightButton = 39;
      this.actionButton = 32;
      this.enemy = 'player1';
    }
    const charData = JSON.parse(localStorage.getItem(this.charName));
    this.charImg = charData.charImg;
    this.img = `${this.charImg}Bottom`;
    this.state = {
      playerStunned: false,
      playerConfused: false,
      playerFrozen: false,
      playerOpacity: 1,
      posX: props.startingPositions.x,
      posY: props.startingPositions.y,
      img: `${this.charImg}Bottom`,
      pixelsPerTile: 3.1,
    };
  }

  componentDidMount() {
    window.addEventListener("gamepadconnected", (event) => {
      console.log("A gamepad connected:");
      console.log(event.gamepad);
    });
    window.addEventListener("gamepaddisconnected", (event) => {
      console.log("A gamepad disconnected:");
      console.log(event.gamepad);
    });
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
    this.traps(this.posX, this.posY);
    this.setState({
      posX: this.posX,
      posY: this.posY,
      img: this.img,
    });
    if (this.gameMode === 'multiplayer') {
      this.multiplayerRefresh();
    }
  }

  multiplayerRefresh() {
    const {
      multiplayerCoordinates, playerNumber, player, resetActions,
    } = this.props;
    multiplayerCoordinates(this.posX, this.posY, playerNumber);
    // When a player gets targeted by a capacity:
    if (player.gettingTargeted) {
      switch (player.gettingTargeted.byCapacity.slice(0, -1)) {
        // Invisibility
        case 'invisibility': {
          this.setState({ playerOpacity: 0 });
          setTimeout(() => this.setState({ playerOpacity: 1 }), 2000);
          break;
        }
        // Psychic: reverse buttons
        case 'psychic': {
          this.setState({ playerConfused: true });
          this.defaultUpButton = this.upButton;
          this.defaultDownButton = this.downButton;
          this.defaultleftButton = this.leftButton;
          this.defaultRightButton = this.rightButton;
          this.upButton = this.defaultDownButton;
          this.downButton = this.defaultUpButton;
          this.leftButton = this.defaultRightButton;
          this.rightButton = this.defaultleftButton;
          setTimeout(() => {
            this.setState({ playerConfused: false });
            this.upButton = this.defaultUpButton;
            this.downButton = this.defaultDownButton;
            this.leftButton = this.defaultleftButton;
            this.rightButton = this.defaultRightButton;
          }, 3000);
          break;
        }
        // Ice: needs a rework
        case 'ice': {
          document.removeEventListener('keydown', this.action, false);
          this.setState({ playerFrozen: true });
          setTimeout(() => {
            document.addEventListener('keydown', this.action, false);
            this.setState({ playerFrozen: false });
          }, 3000);
          break;
        }
        // Default capacity: punch
        default: {
          document.removeEventListener('keydown', this.action, false);
          let gettingPunched = true;
          while (gettingPunched) {
            const { posX, posY } = this.state;
            if (this.checkTile(
              player.gettingTargeted.directionX, player.gettingTargeted.directionY,
            )) {
              this.setState({
                posX: this.posX,
                posY: this.posY,
              });
              this.posX = posX + player.gettingTargeted.directionX;
              this.posY = posY + player.gettingTargeted.directionY;
              this.traps(this.posX, this.posY);
            } else {
              gettingPunched = false;
            }
          }
          setTimeout(() => document.addEventListener('keydown', this.action, false),
            2000);
          resetActions();
          break;
        }
      }
    }
  }

  //    Checks if tile is an obstacle in the level after a move
  // => tiles named "500"+ and items named "900"+
  // AND levers (items 700 to 799)
  // AND doors not activated by levers (even numbers between 800 and 899)
  checkTile(x, y) {
    const {
      tiles, items, finalDoorOpened, enemy,
    } = this.props;
    const { posX, posY } = this.state;
    if (posX + x < 0
      || posY + y < 0
      || posY + y >= tiles.length
      || posX + x >= tiles[posY].length
    ) {
      return false;
    }
    if (this.gameMode === 'multiplayer') {
      // Special check for multiplayer: can't pass through other player
      if (enemy.x === posX + x && enemy.y === posY + y) {
        return false;
      }
      // Special check for multiplayer: final door opened
      if (parseInt(items[posY + y][posX + x], 10) >= 900
        && finalDoorOpened) {
        return true;
      }
    }
    // Normal checks
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

  // Change the position of player when his position = trap position
  // is checked constantly (projectiles are considered as traps)
  traps(x, y) {
    const { posX, posY } = this.state;
    const {
      tiles, items, projectiles, startingPositions,
    } = this.props;
    if ((parseInt(tiles[y][x], 10) >= 400
      && parseInt(tiles[y][x], 10) <= 499)
      || parseInt(tiles[y][x], 10) === 9
      || (parseInt(items[y][x], 10) >= 400
        && parseInt(items[y][x], 10) <= 499)
      || parseInt(projectiles[y][x], 10) > 0
      || (parseInt(tiles[posY][posX], 10) >= 400
        && parseInt(tiles[posY][posX], 10) <= 499)
      || parseInt(tiles[posY][posX], 10) === 9
      || (parseInt(items[posY][posX], 10) >= 400
        && parseInt(items[posY][posX], 10) <= 499)
      || parseInt(projectiles[posY][posX], 10) > 0) {
      document.removeEventListener('keydown', this.action, false);
      this.setState({ playerStunned: true });
      setTimeout(() => {
        this.posX = startingPositions.x;
        this.posY = startingPositions.y;
      }, 200);
      setTimeout(() => {
        this.setState({ playerStunned: false });
        document.addEventListener('keydown', this.action, false);
      }, 900);
    }
  }

  action(event) {
    const {
      ongoingGame, tiles, items, getPlayerPos, playerNumber,
    } = this.props;
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
        this.img = `${this.charImg}Right`;
        if (this.checkTile(1, 0)) {
          this.posX += 1;
        }
      }
      // Move left
      if (event.keyCode === this.leftButton) {
        this.img = `${this.charImg}Left`;
        if (this.checkTile(-1, 0)) {
          this.posX -= 1;
        }
      }
      // Move down
      if (event.keyCode === this.downButton) {
        this.img = `${this.charImg}Bottom`;
        if (this.checkTile(0, 1)) {
          this.posY += 1;
        }
      }
      // Move up
      if (event.keyCode === this.upButton) {
        this.img = `${this.charImg}Top`;
        if (this.checkTile(0, -1)) {
          this.posY -= 1;
        }
      }
      // Callback : game gets new position of the player
      getPlayerPos(this.posX, this.posY, playerNumber);
    }
    // ACTION KEY (spacebar)
    if (event.keyCode === this.actionButton) {
      // Sets coordinates of the targeted tile
      switch (this.img) {
        case `${this.charImg}Top`: {
          this.targetedTileX = this.posX;
          this.targetedTileY = this.posY - 1;
          this.targetedDirection = {
            x: 0,
            y: -1,
          };
          break;
        }
        case `${this.charImg}Left`: {
          this.targetedTileX = this.posX - 1;
          this.targetedTileY = this.posY;
          this.targetedDirection = {
            x: -1,
            y: 0,
          };
          break;
        }
        case `${this.charImg}Right`: {
          this.targetedTileX = this.posX + 1;
          this.targetedTileY = this.posY;
          this.targetedDirection = {
            x: 1,
            y: 0,
          };
          break;
        }
        default: {
          this.targetedTileX = this.posX;
          this.targetedTileY = this.posY + 1;
          this.targetedDirection = {
            x: 0,
            y: 1,
          };
          break;
        }
      }
      // Checks if targeted tile is out of the map
      if (this.targetedTileX >= 0
        && this.targetedTileY >= 0
        && this.targetedTileY < tiles.length
        && this.targetedTileX < tiles[this.targetedTileY].length
      ) {
        const { gameMode, timers } = this.props;
        // Activate lever if there is any on tile
        if (parseInt(items[this.targetedTileY][this.targetedTileX], 10) >= 700
          && parseInt(items[this.targetedTileY][this.targetedTileX], 10) <= 799) {
          const { playerAction } = this.props;
          // Callback to Game for solo, MultiplayerGame for multiplayer
          playerAction(this.targetedTileY, this.targetedTileX);
          // Multiplayer actions;
          // To do: multiple timers if multiple abilities (timers[0] -> timers[selectedAbility])
        } else if (gameMode === 'multiplayer' && timers[0] === 0) {
          const { multiplayerActions, enemy, capacities } = this.props;
          const capacity = capacities[0];
          switch (capacity.slice(0, -1)) {
            case 'ice': {
              if (this.targetedTileX === enemy.x && this.targetedTileY === enemy.y) {
                // Callback to Players
                multiplayerActions(
                  playerNumber, this.enemy, capacity,
                  this.targetedDirection.x, this.targetedDirection.y,
                );
              }
              break;
            }
            case 'invisibility': {
              multiplayerActions(
                playerNumber, this.enemy, capacity,
                this.targetedDirection.x, this.targetedDirection.y,
              );
              break;
            }
            case 'psychic': {
              multiplayerActions(
                playerNumber, this.enemy, capacity,
                this.targetedDirection.x, this.targetedDirection.y,
              );
              break;
            }
            case 'electric': {
              const { playerAction } = this.props;
              playerAction(
                this.targetedTileY, this.targetedTileX, capacity,
                this.targetedDirection.x, this.targetedDirection.y,
              );
              multiplayerActions(
                playerNumber, this.enemy, capacity,
                this.targetedDirection.x, this.targetedDirection.y,
              );
              break;
            }
            case 'fire': {
              const { playerAction } = this.props;
              playerAction(
                this.targetedTileY, this.targetedTileX, capacity,
                this.targetedDirection.x, this.targetedDirection.y,
              );
              multiplayerActions(
                playerNumber, this.enemy, capacity,
                this.targetedDirection.x, this.targetedDirection.y,
              );
              break;
            }
            default: {
              // default ability: punch
              const defaultCapacity = `punch${capacity.slice(-1)}`;
              if (this.targetedTileX === enemy.x && this.targetedTileY === enemy.y) {
                multiplayerActions(
                  playerNumber, this.enemy, defaultCapacity,
                  this.targetedDirection.x, this.targetedDirection.y,
                );
              }
              break;
            }
          }
        }
        this.targetedTileX = null;
        this.targetedTileY = null;
      }
    }
  }

  render() {
    const {
      img, posX, posY, pixelsPerTile, playerOpacity, playerFrozen, playerConfused, playerStunned,
    } = this.state;
    //  Player CSS
    const playerStyle = {
      opacity: playerOpacity,
      position: 'absolute',
      zIndex: 3,
      backgroundImage: `url(./assets/characters/${img}.png`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: '2.5vw',
      width: '2.5vw',
      marginTop: '4.9vw',
      marginLeft: '-10.035315vw',
      transitionDuration: '500ms',
      // To do: cleaner calculation
      top: `${posY * pixelsPerTile}vw`,
      left: `${11 + posX * pixelsPerTile}vw`,
    };
    // if (this.pokemon) {
    switch (this.img) {
      case `${this.charImg}Top`: {
        this.pokemonStyle = {
          top: `${posY * pixelsPerTile}vw`,
          left: `${11 + posX * pixelsPerTile}vw`,
          marginTop: '6.9vw',
          marginLeft: '-10.035315vw',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
      case `${this.charImg}Left`: {
        this.pokemonStyle = {
          top: `${posY * pixelsPerTile}vw`,
          left: `${11 + posX * pixelsPerTile}vw`,
          marginTop: '4.9vw',
          marginLeft: '-8.035315vw',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
      case `${this.charImg}Right`: {
        this.pokemonStyle = {
          top: `${posY * pixelsPerTile}vw`,
          left: `${11 + posX * pixelsPerTile}vw`,
          marginTop: '4.9vw',
          marginLeft: '-12.035315vw',
          transform: 'scaleX(-1)',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
      default: {
        this.pokemonStyle = {
          top: `${posY * pixelsPerTile}vw`,
          left: `${11 + posX * pixelsPerTile}vw`,
          marginTop: '2.9vw',
          marginLeft: '-10.035315vw',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
    }
    // }

    return (
      <div className="playerContainer">
        <div style={playerStyle}>
          {
            playerFrozen
              ? (
                <div className="frozen" />
              )
              : null
          }
          {
            playerConfused
              ? (
                <div className="confused" />
              )
              : null
          }
          {
            playerStunned
              ? (
                <div className="stunned" />
              )
              : null
          }
        </div>
        {
          this.pokemon
            ? (
              <div
                className="pokemonPetContainer"
              >
                <img style={this.pokemonStyle} className="pokemonPet" src={`http://pokestadium.com/sprites/xy/${this.pokemon}.gif`} alt={this.pokemon} />
              </div>
            )
            : null
        }
      </div>

    );
  }
}

export default Player;
