import React from 'react';
import './Tile.css';

function Tile(props) {
  const {
    items, rowIndex, colIndex, tileId, projectiles,
  } = props;
  // Looking for items
  let itemClassName;
  if (items[rowIndex][colIndex] !== '000') {
    // Objectives (items between 002 and 019)
    if (parseInt(items[rowIndex][colIndex], 10) >= 2
      && parseInt(items[rowIndex][colIndex], 10) <= 19) {
      itemClassName = 'Objectives';
    } else if (parseInt(items[rowIndex][colIndex], 10) >= 800
    && parseInt(items[rowIndex][colIndex], 10) <= 899) {
      itemClassName = 'Statues';
      // Final doors (items 900+)
    } else if (parseInt(items[rowIndex][colIndex], 10) >= 900) {
      itemClassName = 'FinalDoor';
    } else {
      itemClassName = 'Item';
    }
  }
  // Looking for projectiles
  let projectileClassName;
  if (projectiles[rowIndex][colIndex] === '001') {
    projectileClassName = 'Fire';
  } else if (projectiles[rowIndex][colIndex] === '002') {
    projectileClassName = 'Lightning';
  }

  return (
    <div
      className="Tile"
      style={{
        backgroundImage: `url(${`./assets/tiles/${tileId}.png`})`,
        backgroundSize: 'contain',
      }}
    >
      {
        items[rowIndex][colIndex] !== '000'
          ? (
            <img
              alt="Item"
              src={`./assets/items/${items[rowIndex][colIndex]}.png`}
              className={itemClassName}
            />
          )
          : null
      }
      {
        projectiles[rowIndex][colIndex] !== '000'
          ? (
            <img
              alt={projectileClassName}
              className={projectileClassName}
              src={`./assets/projectiles/${projectiles[rowIndex][colIndex]}.png`}
              style={{
                position: 'absolute',
                zIndex: 6,
                backgroundImage: `./assets/projectiles/${projectiles[rowIndex][colIndex]}.png`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )
          : null
      }
    </div>
  );
}

export default Tile;
