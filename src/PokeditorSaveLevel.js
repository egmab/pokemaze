import React, { Component } from 'react';

class PokeditorSaveLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelName: '',
    };
  }

  handleChange = (event) => {
    this.setState({ levelName: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { saveLevel } = this.props;
    const { levelName } = this.state;
    saveLevel(levelName);
    this.setState({ levelName: '' });
  }

  render() {
    const { levelName } = this.state;
    return (
      <div style={{ float: 'right' }}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Level name">
            Level name :
            <input name="levelName" type="text" value={levelName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Save level" />
        </form>
      </div>
    );
  }
}

export default PokeditorSaveLevel;
