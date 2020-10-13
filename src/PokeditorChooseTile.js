import React from 'react';

const PokeditorChooseTile = (props) => {
  const { tiles, selectTile } = props;
  return (
    <div style={{ marginBottom: '5px' }}>
      <p style={{ float: 'left', marginRight: '5px', textDecoration: 'underline' }}>Choose tile : </p>
      <div>
        {
          tiles.map((file, index) => (
            <button
              type="button"
              style={{
                backgroundImage: `url(${`./assets/tiles/${tiles[index]}.png`})`,
                marginRight: '3px',
              }}
              className="Tile"
              value={file}
              key={`tileButtonId-${index + 1}`}
              onClick={selectTile}
            />
          ))
        }
      </div>
    </div>
  );
};

export default PokeditorChooseTile;
