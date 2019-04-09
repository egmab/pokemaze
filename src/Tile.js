import React from 'react';

function Tile(props) {
  // Looking for items
  // if no item on tile:
  let tile;
  if (props.items[props.rowIndex][props.colIndex] === '000') {
    tile = (
      <div
        className="Tile"
        style={{ background: `url(${`./assets/tiles/${props.tileId}.png`})` }}
      />
    );
    // if item found on tile, display the item and tile:
  } else {
    tile = (
      <div
        className="Tile"
        style={{
          background: `url(${`./assets/items/${props.items[props.rowIndex][props.colIndex]}.png`}), url(${`./assets/tiles/${props.tileId}.png`})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '70%,contain',
        }}
      />
    );
  }
  return (
    <div>
      {tile}
    </div>
  );
}

export default Tile;
