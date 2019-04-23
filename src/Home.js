import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

let player;
class Home extends Component {
  constructor(props) {
    super(props);
    this.data = {
      pokemons: [],
    };
    this.state = {
      user: '',
    };
    this.onChange = this.onChange.bind(this);
  }


  onChange(event) {
    this.setState({
      user: event.target.value,
    });
  }


  onSubmit = (event) => {
    event.preventDefault();
    const { user } = this.state;
    player = user;
    this.connectedUser = user;
    if (localStorage.getItem(player)) {
      console.log("welcome back")
    } else {
      localStorage.setItem(player, JSON.stringify(this.data));
    }
    if (localStorage.getItem('connectedPlayer')) {
      localStorage.setItem('connectedPlayer', JSON.stringify(player));
    } else {
      localStorage.setItem('connectedPlayer', JSON.stringify(player));
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="home">
        <img src="./assets/logopokemaze.png" alt="logo" />
        <div className="form">
          <h3>
            Player :
            {user}
          </h3>
          <form onSubmit={this.onSubmit}>
            <input
              onChange={this.onChange}
              type="text"
              id="title"
              name="title"
              value={user}
            />
            <input
              className="homeButton"
              size="lg"
              type="submit"
              value="Connect"
            />
          </form>

          <Link to="/solo-game">
            <button
              className="homeButton"
              type="button"
              size="lg"
              style={{ marginRight: 100 }}
            >
              Play solo
            </button>
          </Link>
          <Link to="/solo-game-2">
            <button
              className="homeButton"
              type="button"
              size="lg"
              style={{ marginRight: 100 }}
            >
              Demo chrono
            </button>
          </Link>
          <Link to="/pokedex">
            <button
              className="homeButton"
              type="button"
              size="lg"
            >
              Pokedex
            </button>
          </Link>
        </div>
        <Link to="/multiplayer">
          <button
            className="homeButton"
            type="button"
            size="lg"
            style={{ marginRight: 100 }}
          >
            Multiplayer
          </button>
        </Link>
        <Link to="/pokeditor">
          <button
            className="homeButton"
            type="button"
            size="lg"
            style={{ marginRight: 100 }}
          >
            Pokeditor
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
