import React, { Component } from 'react';
import './App.css';
import * as Labyrinths from './labyrinths.json'
import * as Items from './items.json'


class App extends Component {
  render() {
    // TO DO : choose the level
    const labyrinth = Labyrinths.labyrinth1
    const items = Items.labyrinth1_items
    return (
      <Game labyrinth={labyrinth} items={items}/>
    )
  }
}

class Game extends Component {
  render() {
    // TO DO : put items, starting points etc. in labyrinths.json => rename it to game.json or something
    return (
      <div className="Game">
        {/*    TO DO
        <Chrono />
        <Capacities />
        */}
        <Board labyrinth={this.props.labyrinth} items={this.props.items} />
        <Player labyrinth={this.props.labyrinth}/>
      </div>
    );
  }
}

class Board extends Component {
  render() {
    return (
      <div className="Board">
        <table>
          <tbody>
            {
              this.props.labyrinth.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((tileId, colIndex) =>
                    <th key={colIndex}>
                      <Tile tileId={tileId} items={this.props.items} rowIndex={rowIndex} colIndex={colIndex} labyrinth={this.props.labyrinth} />
                    </th>
                  )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class Tile extends Component {
  render() {
    // Looking for items
    // if no item on tile:
    let tile
    if (this.props.items[this.props.rowIndex][this.props.colIndex] === "000"){
      tile =
        <div
          className="Tile"
          style={{ background: `url(${"./assets/tiles/" + this.props.tileId + ".png"})` }}
        />
    // if item found on tile, display the item and tile:
    } else {
      tile =
      <div
        className="Tile"
        style={{ 
          background: `url(${"./assets/items/"+ this.props.items[this.props.rowIndex][this.props.colIndex]+".png"}), url(${"./assets/tiles/" + this.props.tileId + ".png"})`,
          backgroundPosition:"center",
          backgroundRepeat: 'no-repeat',
          backgroundSize:'70%,contain'
        }}
      />
    }
    return (
      <div>
        {tile}
      </div>
    );
  }
}

class Player extends Component {
  constructor(props) {
    super(props)
    this.action = this.action.bind(this);
    this.canMove = true;
    this.state = {
      posX: 1,
      posY: 0,
      img: 'charBottom',
      pixelsPerTile: 48
    }
  }
  //    Checks if tile is an obstacle in the labyrinth after a move (tiles named "500"+)
  checkTile(x, y) {
    if (parseInt(this.props.labyrinth[this.state.posY + y][this.state.posX + x]) >= 500)
      return false
    return true
  }
  action(event) {
    // MOVES
    if (this.canMove && (event.keyCode === 39 || event.keyCode === 37 || event.keyCode === 40 || event.keyCode === 38)) {
      this.canMove = false
      // Move right
      if (event.keyCode === 39) {
        this.setState({ img: "charRight" })
        if (this.state.posX + 1 < this.props.labyrinth[this.state.posY].length && this.checkTile(1, 0)) {
          const posX = this.state.posX + 1
          this.setState({ posX })
        }
      }
      // Move left
      if (event.keyCode === 37) {
        this.setState({ img: "charLeft" })
        if (this.state.posX > 0 && this.checkTile(-1, 0)) {
          const posX = this.state.posX - 1
          this.setState({ posX })
        }
      }
      // Move down
      if (event.keyCode === 40) {
        this.setState({ img: "charBottom" })
        if (this.state.posY + 1 < this.props.labyrinth.length && this.checkTile(0, 1)) {
          const posY = this.state.posY + 1
          this.setState({ posY })
        }
      }
      // Move up
      if (event.keyCode === 38) {
        this.setState({ img: "charTop" })
        if (this.state.posY > 0 && this.checkTile(0, -1)) {
          const posY = this.state.posY - 1
          this.setState({ posY })
        }
      }
      // Move delay value
      setTimeout(() => {
      this.canMove = true
      }, 200)
    }
    // To do :
    // Activate abilities

  }


  componentDidMount() {
    document.addEventListener("keydown", this.action, false)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.action, false)
  }

  render() {
    //  Player CSS
    let playerStyle = {
      position: "absolute",
      zIndex: 1,
      backgroundImage: "url(./assets/characters/" + this.state.img + ".png",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: "48px",
      width: "48px",
      transitionDuration: "400ms",
      // To do: cleaner calculation
      top: this.state.posY * this.state.pixelsPerTile + 'px',
      left: 11 + this.state.posX * this.state.pixelsPerTile + 'px'
    }

    return (
      <div style={playerStyle} />
    );
  }
}
/*          TO DO
class Chrono extends Component {
  render() {
    return (
      <div className="Chrono">
        <p>Chronomètre</p>
      </div>
    );
  }
}
class Capacities extends Component {
  render() {
    return (
      <div className="Capacities">
        <Capacity element="water" />
        <Capacity element="fire" />
      </div>
    );
  }
}
class Capacity extends Component {
  render() {
    return (
      <div
        className="capacityStyle"
        style={{ backgroundImage: `url(${"./assets/capacities/" + this.props.element + ".png"})` }}
      />
    );
  }
}
*/
export default App;
