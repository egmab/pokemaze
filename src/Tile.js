import React, { Component } from 'react';

class Tile extends Component {
  render() {
    // Looking for items
    // if no item on tile:
    let tile
    if (this.props.items[this.props.rowIndex][this.props.colIndex] === "000") {
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
            background: `url(${"./assets/items/" + this.props.items[this.props.rowIndex][this.props.colIndex] + ".png"}), url(${"./assets/tiles/" + this.props.tileId + ".png"})`,
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '70%,contain'
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

export default Tile