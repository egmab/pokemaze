import React, { Component } from 'react';
import Capacity from './Capacity';
import './Capacities.css';

class Capacities extends Component {
  constructor(props) {
    super(props);
    this.capacities = props.capacities;
    this.state = {
    };
  }

  render() {
    const {
      playerNumber, timers, maxtimers, capacities,
    } = this.props;
    let capacitiesClassName;
    if (playerNumber === 'player1') {
      capacitiesClassName = 'Capacities1';
    }
    if (playerNumber === 'player2') {
      capacitiesClassName = 'Capacities2';
    }
    return (
      <div className={capacitiesClassName}>
        {
          this.capacities.map((capacity, index) => <Capacity className="Capacity" name={capacities[index]} timer={timers[index]} maxtimer={maxtimers[index]} key={`capacityId-${index + 1}`} />)
        }
      </div>
    );
  }
}

export default Capacities;
