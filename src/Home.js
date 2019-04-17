import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    }
    this.onChange = this.onChange.bind(this);
  }


  onChange(event) {
    localStorage.setItem('player', event.target.value);
    this.setState({
      user: event.target.value
    });
  }

  render() {
    return (
      <div className="home">
        <img src="./assets/logopokemaze.png" alt="logo" />
        <div className="form">
          <input
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className="buttonContainerHome">
          <Link to="/solo-game-1">
            <button
              className="homeButton"
              type="button"
              size="lg"
              style={{ marginRight: 100 }}
            >
              Solo mode
        </button>
          </Link>
        </div>
      </div>
    );
  }

}

export default Home;
