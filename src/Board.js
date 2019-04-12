import React from 'react';
import Tile from './Tile';

const Board = ({ tiles, items }) => (
  <div className="Board">
    {
      tiles.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
          {row.map((tileId, colIndex) => (
            <div key={`col-${colIndex}`} className="col">
              <Tile
                tileId={tileId}
                items={items}
                rowIndex={rowIndex}
                colIndex={colIndex}
                tiles={tiles}
              />
            </div>
          ))}
        </div>
      ))
    }
  </div>
);

export default Board;
