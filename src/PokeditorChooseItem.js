import React, { Component } from 'react';

class PokeditorChooseItem extends Component {
  render() {
    const { items, selectItem } = this.props;
    return (
      <div style={{ marginBottom: '5px' }}>
        <p style={{ float: 'left', marginRight: '5px', textDecoration: "underline" }}>Choose item : </p>
        <div>
          {
            items.map((item, index) => (
              <button
                style={{
                  backgroundImage: `url(${"./assets/items/" + items[index] + ".png"})`,
                  marginRight: '3px',
                  backgroundRepeat: 'no-repeat',
                }}
                className="Tile"
                value={item}
                key={index}
                onClick={selectItem}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default PokeditorChooseItem;