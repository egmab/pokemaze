import React, { Component } from 'react';

class PokeditorBoard extends Component {
  render() {
    const { level, items, changeTile, playerOneX, playerOneY, playerTwoX, playerTwoY } = this.props;
    return (
      <div className="Board">
        <table className="pokeditorTable">
          <tbody>
            {
              level.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((tileId, colIndex) =>
                    <th className="pokeditorTh"key={colIndex}>
                      <button
                        // Display Players, I hope you enjoy spaghettis
                        style={{
                          backgroundImage:
                            (
                              (
                                ((rowIndex === playerOneX && colIndex === playerOneY) || (rowIndex === playerTwoX && colIndex === playerTwoY)) ?
                                  ((rowIndex === playerOneX && colIndex === playerOneY) ?
                                    `url('./assets/characters/charBottom.png'), url(${"./assets/tiles/" + tileId + ".png"})`
                                    : ((rowIndex === playerTwoX && colIndex === playerTwoY) ?
                                      `url('./assets/characters/charLeft.png'), url(${"./assets/tiles/" + tileId + ".png"})`
                                      : `url(${"./assets/tiles/" + tileId + ".png"})`
                                    ))
                                  : `url(${"./assets/tiles/" + tileId + ".png"})`
                              )
                            ),
                          backgroundRepeat: 'no-repeat, no-repeat',
                          backgroundPosition: 'center, center'
                        }}

                        className="Tile"
                        value={tileId}
                        onClick={changeTile(rowIndex, colIndex)}
                      >

                        {
                          items[rowIndex][colIndex] !== '000' ?
                            <img alt="Item" className="Item" src={"./assets/items/" + items[rowIndex][colIndex] + ".png"} />
                            : <span></span>

                        }
                      </button>
                    </th>
                  )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default PokeditorBoard;