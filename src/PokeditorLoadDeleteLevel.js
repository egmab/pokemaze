import React, { Component } from 'react';

class PokeditorLoadDeleteLevel extends Component {
  constructor(props) {
    super(props);
    if (props.customLevels) {
      this.state = {
        levelName: props.customLevels[0],
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    const { levelName } = this.state;
    if (!nextProps.customLevels[levelName]) {
      this.setState({ levelName: nextProps.customLevels[0] });
    }
  }

  handleChange = (event) => {
    this.setState({ levelName: event.target.value });
  }

  render() {
    const { levelName } = this.state;
    const { customLevels, loadLevel, deleteLevel } = this.props;
    return (
      <div>
        <form>
          Custom levels list :
          <select value={levelName} onChange={this.handleChange}>
            {
              customLevels
                ? customLevels.map((level, index) => <option key={`levelId-${index + 1}`} value={level}>{level}</option>)
                : null
            }
          </select>
          <button type="button" onClick={() => loadLevel(levelName)} value={levelName} id="loadLevel">Load</button>
          <button type="button" onClick={() => deleteLevel(levelName)} value={levelName} id="deleteLevel">Delete</button>
        </form>
      </div>
    );
  }
}

export default PokeditorLoadDeleteLevel;
