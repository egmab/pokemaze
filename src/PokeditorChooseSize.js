import React, { Component } from 'react';

class PokeditorChooseSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xInput: 10,
      yInput: 10,
    };
  }

  handleChange = (event) => {
    if (event.target.value > 0 && event.target.value <= 50) {
      const input = event.target.name;
      this.setState({ [input]: event.target.value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { changeSize } = this.props;
    const { xInput, yInput } = this.state;
    changeSize(xInput, yInput);
  }

  render() {
    const { xInput, yInput } = this.state;
    return (
      <div>
        <p style={{ margin: '0' }}>
          Change level size
          <span style={{ color: 'red' }}> WARNING: This will RESET current level</span>
        </p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Length">
            Length :
            <input name="xInput" type="number" value={xInput} onChange={this.handleChange} />
          </label>
          <label htmlFor="Height">
            Height :
            <input name="yInput" type="number" value={yInput} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

export default PokeditorChooseSize;
