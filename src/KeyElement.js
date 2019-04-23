import React, { Component } from 'react';

class KeyElement extends Component {
  constructor(props) {
    super(props);
    this.style = {
      opacity: 0.32,
    };
  }

  render() {
    const { isCaught, typeOfKey } = this.props;
    if (isCaught) {
      this.style.opacity = 1;
    }

    return (
      <React.Fragment>
        <div className="keyCircle">
          <img src={`./assets/items/${typeOfKey}.png`} className="keyElement" style={{ ...this.style }} alt="Collected keys" />
        </div>
        <div className="separator" />
      </React.Fragment>
    );
  }
}

export default KeyElement;
