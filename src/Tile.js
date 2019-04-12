import React from 'react';

function Tile(props) {
  // Looking for items
  // if no item on tile:
  let tile;
  const {
    items, rowIndex, colIndex, tileId,
  } = props;
  if (items[rowIndex][colIndex] === '000') {
    tile = (
      <div
        className="Tile"
        style={{ background: `url(${`./assets/tiles/${tileId}.png`})` }}
      />
    );
    // if item found on tile, display the item and tile:
  } else {
    tile = (
      <div
        className="Tile"
        style={{
          background: `url(${`./assets/items/${items[rowIndex][colIndex]}.png`}),url(${`./assets/tiles/${tileId}.png`})`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '60%,contain',
          zIndex: 1,
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
