import React from 'react';

const PokeditorBoard = (props) => {
  const {
    level, items, changeTile, playerOneX, playerOneY, playerTwoX, playerTwoY,
  } = props;
  // Each tile will call this function to determine if there is a player to display
  const tileDisplay = (rowIndex, colIndex, tileId) => {
    let tile;
    if ((rowIndex === playerOneX && colIndex === playerOneY)
      || (rowIndex === playerTwoX && colIndex === playerTwoY)) {
      if (rowIndex === playerOneX && colIndex === playerOneY) {
        tile = `url('./assets/characters/guyBottom.png'), url(${`./assets/tiles/${tileId}.png`})`;
      } else {
        tile = `url('./assets/characters/femaleBottom.png'), url(${`./assets/tiles/${tileId}.png`})`;
      }
    } else {
      tile = `url(${`./assets/tiles/${tileId}.png`})`;
    }
    return tile;
  };
  return (
    <div className="Board" style={{ margin: '0' }}>
      <table className="pokeditorTable">
        <tbody>
          {
            level.map((row, rowIndex) => (
              <tr key={`rowId-${rowIndex + 1}`}>
                {row.map((tileId, colIndex) => (
                  <th className="pokeditorTh" key={`colId-${colIndex + 1}`}>
                    <button
                      type="button"
                      style={{
                        backgroundImage:
                          tileDisplay(
                            rowIndex, colIndex, tileId, playerOneX,
                            playerOneY, playerTwoX, playerTwoY,
                          ),
                        backgroundRepeat: 'no-repeat, no-repeat',
                        backgroundPosition: 'center, center',
                      }}

                      className="Tile"
                      value={tileId}
                      onClick={changeTile(rowIndex, colIndex)}
                    >

                      {
                        items[rowIndex][colIndex] !== '000'
                          ? <img alt="Item" className="Item" src={`./assets/items/${items[rowIndex][colIndex]}.png`} />
                          : null

                      }
                    </button>
                  </th>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};


export default PokeditorBoard;
