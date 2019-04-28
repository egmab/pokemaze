import React, { Component } from 'react';

class Capacity extends Component {
  constructor(props) {
    super(props);
    const level = props.name.slice(-1);
    this.levelIcons = [];
    for (let i = 0; i < 3; i += 1) {
      if (i < level) {
        this.levelIcons.push('star');
      } else {
        this.levelIcons.push('emptyStar');
      }
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
      case 'psychic': {
        this.capacityIcon = 'psychic';
        break;
      }
      case 'ice': {
        this.capacityIcon = 'ice';
        break;
      }
      case 'fire': {
        this.capacityIcon = 'fire';
        break;
      }
      case 'electric': {
        this.capacityIcon = 'electric';
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

        <div className="starsContainer">
          {
            this.levelIcons.map((star, index) => (
              <div
                className={star}
                key={`starId-${index + 1}`}
                alt={star}
              />
            ))
          }
        </div>

      </div>
    );
  }
}

export default Capacity;
