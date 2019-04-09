import React from 'react';
import Tile from './Tile';

function Board(props) {
  return (
    <div className="Board">
      <table>
        <tbody>
          {
            props.labyrinth.map((row, rowIndex) => (
              <tr key={row.rowIndex}>
                {row.map((tileId, colIndex) => (
                  <th key={tileId.colIndex}>
                    <Tile
                      tileId={tileId}
                      items={props.items}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      labyrinth={props.labyrinth}
                    />
                  </th>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Board;

