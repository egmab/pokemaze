import React, { Component } from 'react';

class PokeditorChooseSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
    };
  }

  handleChange = (event) => {
    this.setState({ timer: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { changeTimer } = this.props;
    const { timer } = this.state;
    changeTimer(timer);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Change timer :">
            Timer :
            <input name="xInput" type="number" value={timer} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

export default PokeditorChooseSize;
