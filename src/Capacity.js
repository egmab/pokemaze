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
    if (isReady) {
      this.style.opacity = 1;
    }

    return (
      <React.Fragment>
        <div className="keyCircle">
          <img src="./assets/pokemons/elements/normal.png" className="Capacity" alt={name} />
        </div>
      </React.Fragment>
    );
  }
}

export default Capacity;
