import React, { Component } from 'react';

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
