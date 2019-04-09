import React, { Component } from 'react';

class Chrono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false,
    };
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0,
        running: true,
      });
    }, 1000);
  }

  componentDidMount() {
    this.setState({ count: this.props.count });
  }

  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>{this.format(count)}</h1>
      </div>

    );
  }
}
export default Chrono;
