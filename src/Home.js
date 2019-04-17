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
    const player = user;
    this.connectedUser = user;
    if (localStorage.getItem(player)) {
      alert('utilisateur déjà existant');
    } else {
      localStorage.setItem(player, JSON.stringify(this.data));
      console.log(JSON.parse(localStorage.getItem('data')));
    }
    this.setState({ user: '' });
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
              value="Solo mode"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
