import React, { Component } from 'react';
import './Chrono.css';

class Chrono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: undefined,
    };
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      const { count } = this.state;
      const newCount = count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0,
      });
      if (newCount === 0) {
        clearInterval(this.timer);
      }
      const { getTime } = this.props;
      getTime(newCount);
    }, 1000);
  }

  componentDidMount() {
    const { count } = this.props;
    this.setState({ count });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  format = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  render() {
    const { count } = this.state;
    const { isWinner } = this.props;
    if (isWinner) {
      clearInterval(this.timer);
    }
    return (
      <div className="Timer">
        <div className="Count">{this.format(count)}</div>
      </div>

    );
  }
}
export default Chrono;
