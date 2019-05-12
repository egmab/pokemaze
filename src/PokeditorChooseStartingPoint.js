import React from 'react';

const PokeditorChooseStartingPoint = (props) => {
  const { selectTile } = props;
  return (
    <div>
      <p style={{ float: 'left', marginRight: '5px', textDecoration: 'underline' }}>Starting point : </p>
      <div>
        <p>
          Player 1
          <button
            type="button"
            style={{
              background: 'url("./assets/characters/guyBottom.png"), url("./assets/tiles/008.png")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            className="Tile"
            value="p1"
            onClick={selectTile}
          />
          Player 2
          <button
            type="button"
            style={{
              backgroundImage: 'url("./assets/characters/femaleBottom.png"), url("./assets/tiles/008.png")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            className="Tile"
            value="p2"
            onClick={selectTile}
          />
        </p>
      </div>
    </div>
  );
};

export default PokeditorChooseStartingPoint;
