import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.data = {
      pokemons: [],
    };
    this.state = {
      userOne: '',
      userTwo: '',
      playerOneConnected: false,
      playerTwoConnected: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('connectedPlayer')) {
      this.setState({ userOne: JSON.parse(localStorage.getItem('connectedPlayer')), playerOneConnected: true });
    }
    if (localStorage.getItem('connectedPlayer2')) {
      this.setState({ userTwo: JSON.parse(localStorage.getItem('connectedPlayer2')), playerTwoConnected: true });
    }
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
    if (localStorage.getItem('connectedPlayer')) {
      localStorage.setItem('connectedPlayer', JSON.stringify(userOne));
    } else {
      localStorage.setItem('connectedPlayer', JSON.stringify(userOne));
    }
  }

  onDisconnectOne = (event) => {
    event.preventDefault();
    const { playerOneConnected } = this.state;
    this.setState({ playerOneConnected: !playerOneConnected, userOne: '' });
    localStorage.setItem('connectedPlayer', '');
  }

  onDisconnectTwo = (event) => {
    event.preventDefault();
    const { playerTwoConnected } = this.state;
    this.setState({ playerTwoConnected: !playerTwoConnected, userTwo: '' });
    localStorage.setItem('connectedPlayer2', '');
  }


  onSubmitTwo = (event) => {
    event.preventDefault();
    const { userTwo, playerTwoConnected } = this.state;
    if (!localStorage.getItem(userTwo)) {
      localStorage.setItem(userTwo, JSON.stringify(this.data));
    }
    this.setState({ playerTwoConnected: !playerTwoConnected });
    if (localStorage.getItem('connectedPlayer2')) {
      localStorage.setItem('connectedPlayer2', JSON.stringify(userTwo));
    } else {
      localStorage.setItem('connectedPlayer2', JSON.stringify(userTwo));
    }
  }

  checkConnection = () => {
    console.log('coucou, trop darrrr');
    return false;
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
        <div className="forms">
          {
            playerOneConnected
              ? (
                <div className="formOne">
                  <h6>
                    Player 1 :
                    {' '}
                    {userOne}
                  </h6>
                  <form onSubmit={this.onDisconnectOne}>
                    <input
                      className="disconnectButton"
                      size="lg"
                      type="submit"
                      value="Disconnect"
                    />
                  </form>
                </div>
              )
              : (
                <div className="formOne">
                  <h6>
                    Player 1 :
                    {' '}
                    {userOne}
                  </h6>
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
                  <h6>
                    Player 2 :
                    {' '}
                    {userTwo}
                  </h6>
                  <form onSubmit={this.onDisconnectTwo}>
                    <input
                      className="disconnectButton"
                      size="lg"
                      type="submit"
                      value="Disconnect"
                    />
                  </form>
                </div>
              )
              : (
                <div className="formTwo">
                  <h6>
                    Player 2 :
                    {' '}
                    {userTwo}
                  </h6>
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
        </div>
        <div className="logoButtons">
          <div className="logo">
            <img src="./assets/logopokemaze.png" alt="logo" />
          </div>
          <div className="buttonContainerHome">
            <Link
              to="/solo-game"
              onClick={this.checkConnection}
            >
              <button
                className="homeButton"
                type="button"
                size="lg"
                style={{ marginRight: 100 }}
              >
                Play solo
              </button>
            </Link>

            <Link
              to="/duo-game"
              onClick={this.checkConnection}
            >
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
                className="pokeditor"
                type="button"
                size="lg"
                style={{ marginRight: 100 }}
              >
                <img src="./assets/pokeditor2.png" alt="imgeditor" />
                {' '}
                Pokeditor
              </button>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
