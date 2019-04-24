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
    return (
      <div className="Capacities">
        {
          this.capacities.map((capacity, index) => <Capacity className="Capacity" name={capacity} timer={capacity[index]} key={`capacityId-${index + 1}`} />)
        }
      </div>
    );
  }
}

export default Capacities;
