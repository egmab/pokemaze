import React from 'react';
import Tile from './Tile';
import './Board.css';

const Board = ({ tiles, items, projectiles }) => (
  <div className="Board">
    {
      tiles.map((row, rowIndex) => (
        <div key={`row-${rowIndex + 1}`} className="row">
          {row.map((tileId, colIndex) => (
            <div key={`col-${colIndex + 1}`} className="col">
              <Tile
                tileId={tileId}
                items={items}
                rowIndex={rowIndex}
                colIndex={colIndex}
                tiles={tiles}
                projectiles={projectiles}
              />
            </div>
          ))}
        </div>
      ))
    }
  </div>
);

export default Board;
