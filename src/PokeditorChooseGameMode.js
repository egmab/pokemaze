import React, { Component } from 'react';

class PokeditorChooseGameMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMode: 'Solo',
    };
  }

  handleChange = (event) => {
    this.setState({ gameMode: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { changeGameMode } = this.props;
    const { gameMode } = this.state;
    changeGameMode(gameMode);
  }

  render() {
    const { gameMode } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Change game mode :
          <select value={gameMode} onChange={this.handleChange}>
            <option value="Solo">Solo</option>
            <option value="Multiplayer">Multiplayer</option>
          </select>
          <input type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

export default PokeditorChooseGameMode;
