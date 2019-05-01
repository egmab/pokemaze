import React, { Component } from 'react';
import './Modal.css';
import './Starter.css';

class Starter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '3',
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  tick = () => {
    const { seconds } = this.state;
    if (seconds > 1) {
      this.setState({ seconds: seconds - 1 });
    } else {
      clearInterval(this.timer);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div className="modal-wrapper" style={{ minHeight: '15vw' }}>
        <div className="modal-body">
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h3>
              How to play?
            </h3>
            <div className="keyplayer1">
              <h4>
                Player 1
                <p>
                  move:
                  <img src="./assets/zqsd.png" alt="zqsd" />
                  attack:
                  <img src="./assets/tab.png" alt="tab" />
                </p>
              </h4>
            </div>
            <div className="keyplayer2">
              <h4>
                Player 2
                <p>
                  move:
                  <img src="./assets/fleches.png" alt="fleches" />
                  attack:
                  <img src="./assets/espace.png" alt="espace" />
                </p>
              </h4>
            </div>
            <h1>
              {seconds}
              GO!
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Starter;
