import React from 'react';
import './Tile.css';

function Tile(props) {
  // Looking for items
  // if no item on tile:
  let tile;
  let itemClassName;
  const {
    items, rowIndex, colIndex, tileId,
  } = props;
  if (items[rowIndex][colIndex] === '000') {
    tile = (
      <div
        className="Tile"
        style={{ backgroundImage: `url(${`./assets/tiles/${tileId}.png`})` }}
      />
    );
    // if item found on tile, display the item and tile:
  } else {
    // Objectives (items between 002 and 019)
    if (parseInt(items[rowIndex][colIndex], 10) >= 2
      && parseInt(items[rowIndex][colIndex], 10) <= 19) {
      itemClassName = 'Objectives';
      // Effects for fireballs and lightning bolts
    } else if (parseInt(items[rowIndex][colIndex], 10) === 400) {
      itemClassName = 'Fire';
    } else if (parseInt(items[rowIndex][colIndex], 10) === 401) {
      itemClassName = 'Lightning';
      // Final doors (items 900+)
    } else if (parseInt(items[rowIndex][colIndex], 10) >= 800
      && parseInt(items[rowIndex][colIndex], 10) <= 899) {
      itemClassName = 'Statues';
      // Final doors (items 900+)
    } else if (parseInt(items[rowIndex][colIndex], 10) >= 900) {
      itemClassName = 'FinalDoor';
    } else {
      itemClassName = 'Item';
    }
    tile = (
      <div
        className="Tile"
        style={{
          backgroundImage: `url(${`./assets/tiles/${tileId}.png`})`,
          backgroundSize: 'contain',
        }}
      >
        <img
          alt="Item"
          src={`./assets/items/${items[rowIndex][colIndex]}.png`}
          className={itemClassName}
        />
      </div>
    );
  }
  return (
    <div>
      {tile}
    </div>
  );
}

export default Tile;
