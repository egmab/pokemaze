import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.data = {
      pokemons: [1, 2, 3],
      badges: [23, 13],
      titre: 'je suis très très fort',
    };
    this.state = {
      userOne: '',
      userTwo: '',
      playerOneConnected: false,
      playerTwoConnected: false,
    };
    this.onChange = this.onChange.bind(this);
  }


  onChange(event) {
    const user = event.target.id;
    this.setState({
      [user]: event.target.value,
    });
  }


  onSubmitOne = (event) => {
    event.preventDefault();
    const { userOne, playerOneConnected } = this.state;
    if (!localStorage.getItem(userOne)) {
      localStorage.setItem(userOne, JSON.stringify(this.data));
    }
    this.setState({ playerOneConnected: !playerOneConnected });
  }

  onSubmitTwo = (event) => {
    event.preventDefault();
    const { userTwo, playerTwoConnected } = this.state;
    if (!localStorage.getItem(userTwo)) {
      localStorage.setItem(userTwo, JSON.stringify(this.data));
    }
    this.setState({ playerTwoConnected: !playerTwoConnected });
  }

  render() {
    const {
      userOne,
      userTwo,
      playerOneConnected,
      playerTwoConnected,
    } = this.state;
    return (
      <div className="home">
        {
          playerOneConnected
            ? (
              <div className="formOne">
                <h3>
                  Player 1 :
                  {userOne}
                </h3>
              </div>
            )
            : (
              <div className="formOne">
                <h3>
                  Player 1 :
                  {userOne}
                </h3>
                <form onSubmit={this.onSubmitOne}>
                  <input
                    onChange={this.onChange}
                    type="text"
                    id="userOne"
                    name="title"
                    value={userOne}
                  />
                  <input
                    className="connectButton"
                    size="lg"
                    type="submit"
                    value="Connect"
                  />
                </form>
              </div>
            )
        }
        {
          playerTwoConnected
            ? (
              <div className="formTwo">
                <h3>
                  Player 2 :
                  {userTwo}
                </h3>
              </div>
            )
            : (
              <div className="formTwo">
                <h3>
                  Player 2 :
                  {userTwo}
                </h3>
                <form onSubmit={this.onSubmitTwo}>
                  <input
                    onChange={this.onChange}
                    type="text"
                    id="userTwo"
                    name="title"
                    value={userTwo}
                  />
                  <input
                    className="connectButton"
                    size="lg"
                    type="submit"
                    value="Connect"
                  />
                </form>
              </div>
            )
        }
        <div className="logo">
          <img src="./assets/logopokemaze.png" alt="logo" />
        </div>
        <div className="buttonContainerHome">
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
          <Link to="/pokedex">
            <button
              className="homeButton"
              type="button"
              size="lg"
              style={{ marginRight: 100 }}
            >
              Pokedex
            </button>
          </Link>
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
      </div >
    );
  }
}

export default Home;
