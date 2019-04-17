import React, { Component } from 'react';

class PokeditorChooseTile extends Component {
  render() {
    const { tiles, selectTile } = this.props;
    return (
      <div style={{ marginBottom: '5px' }}>
        <p style={{ float: 'left', marginRight: '5px', textDecoration: "underline" }}>Choose tile : </p>
        <div>
          {
            tiles.map((file, index) => (
              <button
                style={{
                  backgroundImage: `url(${"./assets/tiles/" + tiles[index] + ".png"})`,
                  marginRight: '3px'
                }}
                className="Tile"
                value={file}
                key={index}
                onClick={selectTile}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default PokeditorChooseTile;