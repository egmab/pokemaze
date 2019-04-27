import React, { Component } from 'react';

class Capacity extends Component {
  constructor(props) {
    super(props);
    const level = props.name.slice(-1);
    this.levelIcons = [];
    let counter = 0;
    for (let i = 0; i < 3; i += 1) {
      if (counter < level) {
        this.levelIcons.push('star');
      }
      counter += 1;
    }
    this.capacityIcon = props.name.slice(0, -1);
    this.maxtimer = props.maxtimer;
    this.name = props.name;
    switch (this.capacityIcon) {
      case 'invisibility': {
        this.capacityIcon = 'ghost';
        break;
      }
      case 'punch': {
        this.capacityIcon = 'fighting';
        break;
      }
      default: {
        this.capacityIcon = 'fighting';
        break;
      }
    }
  }


  shouldComponentUpdate(nextProps) {
    const { timer } = this.props;
    if (nextProps.timer === 0 && timer === 0) {
      return false;
    }
    return true;
  }

  render() {
    const { timer } = this.props;
    const progress = timer * 100 / this.maxtimer;
    return (
      <div style={{
        backgroundImage: `url("./assets/pokemons/elements/${this.capacityIcon}.png")`,
        backgroundSize: 'contain',
        width: '100%',
        height: '100%',
      }}
      >
        <div style={{
          height: `${progress}%`,
          filter: 'grayscale(1)',
          zIndex: '2',
          backgroundImage: `url("./assets/pokemons/elements/${this.capacityIcon}.png")`,
          backgroundSize: '100%',
          transition: '1000ms linear',
        }}
        />
        {/*
        <div style={{ width: '6vw', height: '2vw' }}>
          {
            this.levelIcons.map((star, index) => (
              <div
                className="levelStar"
                key={`starId-${index + 1}`}
                alt={star}
                backgroundImage={`./assets/capacities/${star}.png`}
              />
            ))
          }
        </div>
        */}
      </div>
    );
  }
}

export default Capacity;
