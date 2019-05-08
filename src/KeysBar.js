import React, { Component } from 'react';
import KeyElement from './KeyElement';
import './KeysBar.css';

class KeysBar extends Component {
  constructor(props) {
    super(props);
    const {
      collectedKeys, numberOfKeys, finalDoorID, playerNumber,
    } = this.props;
    this.tab = new Array(numberOfKeys).fill(false);
    this.style = {
      opacity: 1,
      display: 'inline',
      width: '40%',
      marginTop: '30%',
      position: 'absolute',
      left: '30%',
    };
    this.styleDoor = {
      backgroundImage: `url(${`./assets/items/${finalDoorID}.png`})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%,contain',
      opacity: 0.6,
    };
    if (collectedKeys === numberOfKeys) {
      this.styleDoor.opacity = 1;
      this.style.display = 'none';
    }
    if (playerNumber === 'player1') {
      this.keyBarclassName = 'keysBar1';
      this.keyElementClassName = 'keyElement1';
    } else {
      this.keyBarclassName = 'keysBar2';
      this.keyElementClassName = 'keyElement2';
    }
  }

  componentWillReceiveProps(nextProps) {
    const { collectedKeys, numberOfKeys } = this.props;
    if (collectedKeys === numberOfKeys) {
      this.styleDoor.opacity = 1;
      this.style.display = 'none';
    }
    if (collectedKeys < nextProps.collectedKeys) {
      for (let i = 0; i < nextProps.collectedKeys; i += 1) {
        this.tab[i] = true;
      }
    } else {
      for (let i = numberOfKeys - 1; i >= collectedKeys; i -= 1) {
        this.tab[i] = false;
      }
    }
  }

  render() {
    const { typeOfKey } = this.props;
    return (
      <div className={this.keyBarclassName}>
        {this.tab.map((boolean, index) => (
          <div className={this.keyElementClassName} key={`KeyElement-${index + 1}`}>
            <KeyElement index={index} isCaught={boolean} typeOfKey={typeOfKey} />
          </div>
        ))}
        <div className="bigKeyCircle" style={{ ...this.styleDoor }}>
          <img src="./assets/capacities/cadenas.png" style={{ ...this.style }} alt="Final door" />
        </div>
      </div>
    );
  }
}
export default KeysBar;
