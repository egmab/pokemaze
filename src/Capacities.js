import React, { Component } from 'react';
import Capacity from './Capacity';

class Capacities extends Component {
  constructor(props) {
    super(props);
    this.capacities = props.capacities;
    this.state = {

    };
  }

  render() {
    const { timers, capacities } = this.props;
    return (
      <div className="Capacities">
        {
          this.capacities.map((capacity, index) => <Capacity className="Capacity" name={capacities[index]} timer={timers[index]} key={`capacityId-${index + 1}`} />)
        }
      </div>
    );
  }
}

export default Capacities;
