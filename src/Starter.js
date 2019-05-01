import React, { Component } from 'react';
import './Modal.css';
import './Starter.css';

class Starter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '4',
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  tick = () => {
    const { getStarter } = this.props;
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState({ seconds: seconds - 1 });
    } else {
      clearInterval(this.timer);
      getStarter();
    }
  }

  render() {
    const { seconds } = this.state;
    const { gameMode } = this.props;
    return (
      <div className="modal-wrapper" style={{ minHeight: '15vw', top: '-3vw' }}>
        <div className="modalkey-body">
          <h3>
            How to play?
          </h3>
          <div className="keymodal">
            <div className="keyplayer1">
              <h5>Player 1</h5>
              <p>
                <h6>move:</h6>
                <img src="./assets/zqsd.png" alt="zqsd" />
              </p>
              <p>
                <h6>action/attack:</h6>
                <img src="./assets/tab.png" alt="tab" />
              </p>
            </div>
            {gameMode === 'multiplayer'
              ? (
                <div className="keyplayer2">
                  <h5>Player 2</h5>
                  <p>
                    <h6>move:</h6>
                    <img src="./assets/fleches.png" alt="fleches" />
                  </p>
                  <p>
                    <h6>action/attack:</h6>
                    <img src="./assets/espace.png" alt="espace" />
                  </p>
                </div>

              )
              : (undefined)
            }
          </div>
          <h1>
            {
              seconds !== 0
                ? seconds
                : 'GO!'
            }
          </h1>
        </div>
      </div>
    );
  }
}

export default Starter;
