import React from 'react';
import Tile from './Tile';

const Board = ({ tiles, items }) => (
  <div className="Board">
    <table>
      <tbody>
        {
          tiles.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((tileId, colIndex) => (
                <th key={`col-${colIndex}`}>
                  <Tile
                    tileId={tileId}
                    items={items}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    tiles={tiles}
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

export default Board;
