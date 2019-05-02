import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Video from './Video';

class Home extends Component {
  constructor(props) {
    super(props);
    this.charImagesList = ['guy', 'female', 'black', 'blue', 'guyCape', 'red', 'white', 'pinkHatLady'];
    this.data = {
      pokemons: [],
      charImg: 'guy',
    };
    this.state = {
      userOne: '',
      userOneImg: 'guy',
      userTwo: '',
      userTwoImg: 'guy',
      playerOneConnected: false,
      playerTwoConnected: false,
      test: false,
    };
    this.onChange = this.onChange.bind(this);
    this.connectStyle = {};
  }

  componentWillMount() {
    if (localStorage.getItem('connectedPlayer')) {
      const charName = JSON.parse(localStorage.getItem('connectedPlayer'));
      const charData = JSON.parse(localStorage.getItem(charName));
      const img = charData.charImg;
      this.setState({
        userOne: charName,
        userOneImg: img,
        playerOneConnected: true,
      });
    }
    if (localStorage.getItem('connectedPlayer2')) {
      const charName = JSON.parse(localStorage.getItem('connectedPlayer2'));
      const charData = JSON.parse(localStorage.getItem(charName));
      const img = charData.charImg;
      this.setState({
        userTwo: charName,
        userTwoImg: img,
        playerTwoConnected: true,
      });
    }
  }

  componentDidMount() {
    this.switchButton();
  }

  onChange(event) {
    const user = event.target.id;
    this.setState({
      [user]: event.target.value,
    });
  }

  switchButton = () => {
    if (localStorage.getItem('connectedPlayer')) {
      document.getElementById('solo').disabled = false;
    } else {
      document.getElementById('solo').disabled = true;
    }
    if (localStorage.getItem('connectedPlayer') && localStorage.getItem('connectedPlayer2')) {
      document.getElementById('multi').disabled = false;
    } else {
      document.getElementById('multi').disabled = true;
    }
  }

  changeCharImgOne = (num) => {
    const { userOneImg } = this.state;
    const currentIndex = this.charImagesList.indexOf(userOneImg);
    let nextIndex = currentIndex + num;
    if (nextIndex < 0) {
      nextIndex = this.charImagesList.length - 1;
    }
    if (nextIndex > this.charImagesList.length - 1) {
      nextIndex = 0;
    }
    const charName = JSON.parse(localStorage.getItem('connectedPlayer'));
    const charData = JSON.parse(localStorage.getItem(charName));
    charData.charImg = this.charImagesList[nextIndex];
    localStorage.setItem(charName, JSON.stringify(charData));
    this.setState({ userOneImg: this.charImagesList[nextIndex] });
  }

  changeCharImgTwo = (num) => {
    const { userTwoImg } = this.state;
    const currentIndex = this.charImagesList.indexOf(userTwoImg);
    let nextIndex = currentIndex + num;
    if (nextIndex < 0) {
      nextIndex = this.charImagesList.length - 1;
    }
    if (nextIndex > this.charImagesList.length - 1) {
      nextIndex = 0;
    }
    // this.charImagesList = ['guy', 'female'];
    const charName = JSON.parse(localStorage.getItem('connectedPlayer2'));
    const charData = JSON.parse(localStorage.getItem(charName));
    charData.charImg = this.charImagesList[nextIndex];
    localStorage.setItem(charName, JSON.stringify(charData));
    this.setState({ userTwoImg: this.charImagesList[nextIndex] });
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
    this.switchButton();
  }

  onDisconnectOne = (event) => {
    event.preventDefault();
    const { playerOneConnected } = this.state;
    this.setState({ playerOneConnected: !playerOneConnected, userOne: '' });
    localStorage.setItem('connectedPlayer', '');
    this.switchButton();
  }

  onDisconnectTwo = (event) => {
    event.preventDefault();
    const { playerTwoConnected } = this.state;
    this.setState({ playerTwoConnected: !playerTwoConnected, userTwo: '' });
    localStorage.setItem('connectedPlayer2', '');
    this.switchButton();
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
    this.switchButton();
  }

  videoTrue = () => {
    const { test } = this.state;
    this.setState({
      test: !test,
    });
  }

  disconnect = () => {
    this.connectStyle = {};
  }

  connect = () => {
    this.connectStyle = { marginTop: '-18vw' };
  }

  render() {
    const {
      userOne,
      userTwo,
      playerOneConnected,
      playerTwoConnected,
      test,
      userOneImg,
      userTwoImg,
    } = this.state;
    return (
      <div className="home">
        <img
          src="./assets/play1.png"
          className="Intro"
          role="presentation"
          alt="play"
          onClick={this.videoTrue}
        />
        <img
          src="./assets/play2.png"
          className="Intro2"
          role="presentation"
          alt="play"
          onClick={this.videoTrue}
        />
        {test ? <Video videoTrue={this.videoTrue} /> : null}
        {
          playerOneConnected
            ? (
              <div
                className="formOne1"
                id="formOne"
                style={{
                }}
              >
                <h6>
                  Player 1 :
                  {' '}
                  {userOne}
                </h6>
                <div className="changeCharacter">
                  <button
                    className="changeCharacterImgButton1"
                    style={{
                      backgroundImage: 'url(./assets/previous-arrow.png)',
                    }}
                    type="button"
                    value="userOne"
                    onClick={() => this.changeCharImgOne(-1)}
                  />
                  <div
                    style={{
                      backgroundPosition: 'center',
                      backgroundImage: `url(./assets/characters/${userOneImg}Bottom.png)`,
                      height: '5vw',
                      width: '5vw',
                      backgroundSize: '5vw',
                      backgroundRepeat: 'no-repeat',
                      marginBottom: '1vw',
                    }}
                  />
                  <button
                    className="changeCharacterImgButton2"
                    style={{
                      backgroundImage: 'url(./assets/next-arrow.png)',
                    }}
                    type="button"
                    value="userOne"
                    onClick={() => this.changeCharImgOne(1)}
                  />
                </div>
                <form onSubmit={this.onDisconnectOne}>
                  <input
                    className="disconnectButton"
                    size="lg"
                    type="submit"
                    value="Disconnect"
                    onClick={this.disconnect}
                  />
                </form>
              </div>
            )
            : (
              <div
                className="formOne2"
                id="formOne"
                style={{
                }}
              >
                <h6>
                  Player 1 :
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
                    onClick={this.connect}
                  />
                </form>
              </div>
            )
        }
        {
          playerTwoConnected
            ? (
              <div
                className="formTwo1"
                id="formOne"
                style={this.connectStyle}
              >
                <h6>
                  Player 2 :
                  {' '}
                  {userTwo}
                </h6>
                <div className="changeCharacter">
                  <button
                    className="changeCharacterImgButton3"
                    style={{
                      backgroundImage: 'url(./assets/previous-arrow.png)',
                    }}
                    type="button"
                    value="userTwo"
                    onClick={() => this.changeCharImgTwo(-1)}
                  />
                  <div
                    style={{
                      backgroundPosition: 'center',
                      backgroundImage: `url(./assets/characters/${userTwoImg}Bottom.png)`,
                      height: '5vw',
                      width: '5vw',
                      backgroundSize: '5vw',
                      backgroundRepeat: 'no-repeat',
                      marginBottom: '1vw',
                    }}
                  />
                  <button
                    className="changeCharacterImgButton4"
                    style={{
                      backgroundImage: 'url(./assets/next-arrow.png)',
                    }}
                    type="button"
                    value="userTwo"
                    onClick={() => this.changeCharImgTwo(1)}
                  />
                </div>
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
              <div
                className="formTwo2"
                id="formOne"
                style={this.connectStyle}
              >
                <h6>
                  Player 2 :
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
        <div className="logoButtons">
          <div className="logo">
            <img className="imgLogo" src="./assets/logopokemaze.png" alt="logo" />
          </div>
          <div className="buttonContainerHome">
            <Link
              to="/solo-game"
            >
              <button
                className="homeButton"
                id="solo"
                type="button"
                size="lg"
                style={{
                  width: '14vw',
                  marginRight: '5vw',
                }}
              >
                Play solo
              </button>
            </Link>

            <Link
              to="/duo-game"
            >
              <button
                className="homeButton"
                id="multi"
                type="button"
                size="lg"
                style={{
                  width: '15vw',
                  marginRight: '5vw',
                }}
              >
                Multiplayer
              </button>
            </Link>

            <Link to="/pokeditor">
              <button
                className="pokeditor"
                type="button"
                size="lg"
                style={{
                  width: '16vw',
                  marginRight: '5vw',
                }}
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
