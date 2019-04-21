import React from 'react';

const PokeditorChooseItem = (props) => {
  const { items, selectItem } = props;
  return (
    <div style={{ marginBottom: '5px' }}>
      <p style={{ float: 'left', marginRight: '5px', textDecoration: 'underline' }}>Choose item : </p>
      <div>
        {
          items.map((item, index) => (
            <button
              type="button"
              style={{
                backgroundImage: `url(${`./assets/items/${items[index]}.png`})`,
                marginRight: '3px',
                backgroundRepeat: 'no-repeat',
              }}
              className="Tile"
              value={item}
              key={`tileId-${index + 1}`}
              onClick={selectItem}
            />
          ))
        }
      </div>
    </div>
  );
};

export default PokeditorChooseItem;
