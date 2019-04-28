import React, { Component } from 'react';
import Projectile from './Projectile';

class Projectiles extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { projectilesMatrix } = this.props;
    return (
      <div>
        {
          projectilesMatrix.map((projectile, index) => (
            projectile !== '000'
              ? <Projectile projectile={projectilesMatrix[projectile]} key={`projectileId-${index + 1}`} />
              : null
          ))
        }
      </div>
    );
  }
}

export default Projectiles;
