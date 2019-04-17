import React, { Component } from 'react';

class PokeditorChooseStartingPoint extends Component {
  render() {
    const { selectTile } = this.props;
    return (
      <div>
        <p style={{ float: 'left', marginRight: '5px', textDecoration: "underline" }}>Starting point : </p>
        <div>
          <p>Player 1
            <button
              style={{
                background: `url("./assets/characters/charBottom.png"), url("./assets/tiles/008.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
              className="Tile"
              value="p1"
              onClick={selectTile}
            />
            Player 2
            <button
              style={{
                backgroundImage: `url("./assets/characters/charLeft.png"), url("./assets/tiles/008.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
              className="Tile"
              value="p2"
              onClick={selectTile}
            />
          </p>
        </div>
      </div>
    )
  }
}

export default PokeditorChooseStartingPoint;