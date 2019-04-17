import React from 'react';
import KeyElement from './KeyElement';
import './KeysBar.css';

const KeysBar = ({
  collectedKeys, numberOfKeys, typeOfKey, finalDoorID,
}) => {
  const tab = new Array(numberOfKeys).fill(0);
  const style = {
    opacity: 1,
    display: 'inline',
    width: '40%',
    marginTop: '30%',
  };
  const styleDoor = {
    backgroundImage: `url(${`./assets/items/${finalDoorID}.png`})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%,contain',
    opacity: 0.6,
  };
  if (collectedKeys === numberOfKeys) {
    styleDoor.opacity = 1;
    style.display = 'none';
  }

  return (
    <div className="keysBar">
      {tab.map((number, index) => (
        <div className="keysContainer">
          <KeyElement isCaught={collectedKeys === index + 1} typeOfKey={typeOfKey} />
        </div>
      ))}
      <div className="bigKeyCircle" style={{ ...styleDoor }}>
        <img src="./assets/capacities/cadenas.png" style={{ ...style }} alt="Final door" />
      </div>
    </div>

  );
};
export default KeysBar;
