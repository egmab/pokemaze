import React, { Component } from 'react';

class Capacity extends Component {
  constructor(props) {
    super(props);
    this.style = {
      opacity: 0.32,
    };
  }

  render() {
    const { name, timer } = this.props;
    let isReady;
    if (timer === 0) {
      isReady = true;
    }
    if (isReady) {
      this.style.opacity = 1;
    }

    return (
      <div>
        <p>{timer}</p>
        <img style={{ ...this.style }} src="./assets/pokemons/elements/normal.png" className="Capacity" alt={name} />
      </div>
    );
  }
}

export default Capacity;
