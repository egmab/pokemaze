import React, { Component } from 'react';
import Tile from './Tile'

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
export default Board