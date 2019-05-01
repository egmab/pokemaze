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
    const posX = props.startingPositions.x;
    const posY = props.startingPositions.y;
    this.posX = posX;
    this.posY = posY;
    this.targetedTileX = this.posX;
    this.targetedTileY = this.posY + 1;
    this.canMove = true;
    this.moveTime = Date.now();
    this.speed = 200;
    // Define buttons for each player
    if (props.playerNumber === 'player1') {
      this.charName = JSON.parse(localStorage.getItem('connectedPlayer'));
      this.gpNumber = 0;
      this.keys = {
        up: {
          keyboard: 90,
          pad: 12,
          pressed: false,
          padPressed: false,
        },
        down: {
          keyboard: 83,
          pad: 13,
          pressed: false,
          padPressed: false,
        },
        left: {
          keyboard: 81,
          pad: 14,
          pressed: false,
          padPressed: false,
        },
        right: {
          keyboard: 68,
          pad: 15,
          pressed: false,
          padPressed: false,
        },
        action: {
          keyboard: 16,
          pad: 0,
          pressed: false,
          padPressed: false,
        },
      };
      this.enemy = 'player2';
    } else if (props.playerNumber === 'player2') {
      this.charName = JSON.parse(localStorage.getItem('connectedPlayer2'));
      this.gpNumber = 1;
      this.keys = {
        up: {
          keyboard: 38,
          pad: 12,
          pressed: false,
          padPressed: false,
        },
        down: {
          keyboard: 40,
          pad: 13,
          pressed: false,
          padPressed: false,
        },
        left: {
          keyboard: 37,
          pad: 14,
          pressed: false,
          padPressed: false,
        },
        right: {
          keyboard: 39,
          pad: 15,
          pressed: false,
          padPressed: false,
        },
        action: {
          keyboard: 32,
          pad: 0,
          pressed: false,
          padPressed: false,
        },
      };
      this.enemy = 'player1';
    }
    // Get player image
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
    document.addEventListener('keydown', this.triggerKeyboard, false);
    document.addEventListener('keyup', this.handleKeyUp, false);
    this.gameLoop = setInterval(() => {
      this.refreshRender();
    }, 50);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.triggerKeyboard, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);
    clearInterval(this.gameLoop);
  }

  refreshRender = () => {
    const { ongoingGame } = this.props;
    if (ongoingGame === false) {
      clearInterval(this.gameLoop);
    }
    const now = Date.now();
    if (now - this.moveTime > this.speed) {
      this.resetMove();
    }
    if (this.canMove) {
      this.handleGamepad();
      this.handleKeyboard();
    }
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

  resetMove = () => {
    const { playerStunned, playerFrozen } = this.state;
    if (!playerStunned && !playerFrozen) {
      this.canMove = true;
    }
  }

  handleGamepad = () => {
    const gp = navigator.getGamepads();
    if (gp[this.gpNumber] !== null) {
      if (gp[this.gpNumber].buttons[this.keys.up.pad].pressed) {
        this.action('up');
      } else if (gp[this.gpNumber].buttons[this.keys.down.pad].pressed) {
        this.action('down');
      } else if (gp[this.gpNumber].buttons[this.keys.left.pad].pressed) {
        this.action('left');
      } else if (gp[this.gpNumber].buttons[this.keys.right.pad].pressed) {
        this.action('right');
      } else if (gp[this.gpNumber].buttons[this.keys.action.pad].pressed) {
        this.action('action');
      }
    }
  }

  triggerKeyboard = (e) => {
    if (e.keyCode === this.keys.up.keyboard) {
      this.keys.up.pressed = true;
    }
    if (e.keyCode === this.keys.down.keyboard && this.keys.down.pressed === false) {
      this.keys.down.pressed = true;
    }
    if (e.keyCode === this.keys.left.keyboard && this.keys.left.pressed === false) {
      this.keys.left.pressed = true;
    }
    if (e.keyCode === this.keys.right.keyboard && this.keys.right.pressed === false) {
      this.keys.right.pressed = true;
    }
    if (e.keyCode === this.keys.action.keyboard && this.keys.action.pressed === false) {
      this.keys.action.pressed = true;
    }
  }

  handleKeyboard = () => {
    if (this.keys.up.pressed) {
      this.keys.up.pressed = false;
      this.action('up');
    }
    if (this.keys.down.pressed) {
      this.keys.down.pressed = false;
      this.action('down');
    }
    if (this.keys.left.pressed) {
      this.keys.left.pressed = false;
      this.action('left');
    }
    if (this.keys.right.pressed) {
      this.keys.right.pressed = false;
      this.action('right');
    }
    if (this.keys.action.pressed) {
      this.keys.action.pressed = false;
      this.action('action');
    }
  }

  handleKeyUp = (e) => {
    switch (e.keyCode) {
      case this.keys.down.keyboard: {
        this.keys.down.pressed = false;
        break;
      }
      case this.keys.up.keyboard: {
        this.keys.up.pressed = false;
        break;
      }
      case this.keys.left.keyboard: {
        this.keys.left.pressed = false;
        break;
      }
      case this.keys.right.keyboard: {
        this.keys.right.pressed = false;
        break;
      }
      case this.keys.action.keyboard: {
        this.keys.action.pressed = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  action = (action) => {
    const {
      tiles, items, getPlayerPos, playerNumber,
    } = this.props;
    // MOVES
    if (this.canMove) {
      this.moveTime = Date.now();
      this.canMove = false;
      // Move right
      if (action === 'right') {
        this.keys.right.pressed = true;
        this.img = `${this.charImg}RightFeet`;
        setTimeout(() => {
          this.img = `${this.charImg}Right`;
        }, 100);
        if (this.checkTile(1, 0)) {
          this.posX += 1;
        }
        getPlayerPos(this.posX, this.posY, playerNumber);
        return;
      }
      // Move left
      if (action === 'left') {
        this.keys.left.pressed = true;
        this.img = `${this.charImg}LeftFeet`;
        setTimeout(() => {
          this.img = `${this.charImg}Left`;
        }, 100);
        if (this.checkTile(-1, 0)) {
          this.posX -= 1;
        }
        getPlayerPos(this.posX, this.posY, playerNumber);
        return;
      }
      // Move down
      if (action === 'down') {
        this.keys.down.pressed = true;
        this.img = `${this.charImg}BottomFeet`;
        setTimeout(() => {
          this.img = `${this.charImg}Bottom`;
        }, 100);
        if (this.checkTile(0, 1)) {
          this.posY += 1;
        }
        getPlayerPos(this.posX, this.posY, playerNumber);
        return;
      }
      // Move up
      if (action === 'up') {
        this.keys.up.pressed = true;
        this.img = `${this.charImg}TopFeet`;
        setTimeout(() => {
          this.img = `${this.charImg}Top`;
        }, 100);
        if (this.checkTile(0, -1)) {
          this.posY -= 1;
        }
        getPlayerPos(this.posX, this.posY, playerNumber);
        return;
      }
      // ACTION KEY
      if (action === 'action') {
        this.keys.action.pressed = true;
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
      this.setState({ playerStunned: true });
      setTimeout(() => {
        this.posX = startingPositions.x;
        this.posY = startingPositions.y;
      }, 200);
      setTimeout(() => {
        this.setState({ playerStunned: false });
      }, 900);
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
          this.defaultUpButton = this.keys.up.keyboard;
          this.defaultUpPadButton = this.keys.up.pad;
          this.defaultDownButton = this.keys.down.keyboard;
          this.defaultDownPadButton = this.keys.down.pad;
          this.defaultLeftButton = this.keys.left.keyboard;
          this.defaultLeftPadButton = this.keys.left.pad;
          this.defaultRightButton = this.keys.right.keyboard;
          this.defaultRightPadButton = this.keys.right.pad;
          this.keys.up.keyboard = this.defaultDownButton;
          this.keys.up.pad = this.defaultDownPadButton;
          this.keys.down.keyboard = this.defaultUpButton;
          this.keys.down.pad = this.defaultUpPadButton;
          this.keys.left.keyboard = this.defaultRightButton;
          this.keys.left.pad = this.defaultRightPadButton;
          this.keys.right.keyboard = this.defaultLeftButton;
          this.keys.right.pad = this.defaultUpLeftPadButton;
          setTimeout(() => {
            this.setState({ playerConfused: false });
            this.keys.up.keyboard = this.defaultUpButton;
            this.keys.up.pad = this.defaultUpPadButton;
            this.keys.down.keyboard = this.defaultDownButton;
            this.keys.down.pad = this.defaultDownPadButton;
            this.keys.left.keyboard = this.defaultLeftButton;
            this.keys.left.pad = this.defaultLeftPadButton;
            this.keys.right.keyboard = this.defaultRightButton;
            this.keys.right.pad = this.defaultRightPadButton;
          }, 3000);
          break;
        }
        // Ice: needs a rework
        case 'ice': {
          this.setState({ playerFrozen: true });
          setTimeout(() => {
            this.setState({ playerFrozen: false });
          }, 3000);
          break;
        }
        // Default capacity: punch
        default: {
          this.setState({ playerStunned: true });
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
          setTimeout(() => {
            this.setState({ playerStunned: false });
          }, 2000);
          resetActions();
          break;
        }
      }
    }
  }

  render() {
    const {
      img, posX, posY, pixelsPerTile, playerOpacity, playerFrozen, playerConfused, playerStunned,
    } = this.state;
    // Player CSS
    const playerStyle = {
      opacity: playerOpacity,
      position: 'absolute',
      zIndex: 3,
      backgroundImage: `url(./assets/characters/${img}.png`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: '2.5vw',
      width: '2.5vw',
    };
    //  Player Container CSS
    const globalStyle = {
      position: 'absolute',
      zIndex: 0,
      height: '2.5vw',
      width: '2.5vw',
      marginTop: '4.9vw',
      marginLeft: '-10.035315vw',
      // To do: cleaner calculation
      top: `${posY * pixelsPerTile}vw`,
      left: `${11 + posX * pixelsPerTile}vw`,
      transitionDuration: '300ms',
      transitionTimingFunction: 'linear',
    };
    // if (this.pokemon) {
    switch (this.img) {
      case `${this.charImg}Top`: {
        this.pokemonStyle = {
          marginTop: '2.5vw',
          marginLeft: '-1.4vw',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
      case `${this.charImg}Left`: {
        this.pokemonStyle = {
          marginTop: '0.3vw',
          marginLeft: '0.6vw',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
      case `${this.charImg}Right`: {
        this.pokemonStyle = {
          marginTop: '0.3vw',
          marginLeft: '-3.3vw',
          transform: 'scaleX(-1)',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
      default: {
        this.pokemonStyle = {
          marginTop: '-2.2vw',
          marginLeft: '-1.2vw',
          transitionProperty: 'top, left, margin-top, margin-left',
        };
        break;
      }
    }
    // }

    return (
      <div className="playerContainer" style={globalStyle}>
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
