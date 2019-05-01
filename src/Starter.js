import React, { Component } from 'react';

class Starter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 3,
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }


  componentDidMount() {
    const { seconds } = this.state;
    const timeLeft = this.secondsToTime(seconds);
    this.setState({ time: timeLeft });
  }

  secondsToTime(secs) {
    const hours = Math.floor(this.secs / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };

    return obj;
  }

  countDown() {
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        m:
        {time.m}
        s:
        {time.s}
      </div>
    );
  }
}

export default Starter;
