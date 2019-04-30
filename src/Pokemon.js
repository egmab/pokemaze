import React, { Component } from 'react';


class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onePokemon: [],
    };
    const { pokemonName, pokemonsCaught } = this.props;
    this.pokemon = pokemonName;
    this.caught = pokemonsCaught;
    this.pokemonClass = undefined;
    this.pokemonType = undefined;
    this.pokemonNumber = 0;
    this.classType = undefined;
  }

  componentWillMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          onePokemon: data,
        });
      });
    const { pokemonName } = this.props;
    this.pokemonClass = 'notHave';
    for (let i = 0; i < this.caught.length; i += 1) {
      if (this.caught[i].name === pokemonName) {
        this.pokemonClass = 'pokemon-single-container';
        break;
      } else {
        this.pokemonClass = 'notHave';
      }
    }

    for (let i = 0; i < this.caught.length; i += 1) {
      if (this.caught[i].name === pokemonName) {
        this.pokemonNumber += 1;
      }
    }

    switch (this.pokemon) {
      case 'nidoran-f':
        this.pokemon = 'nidoranf';
        break;
      case 'nidoran-m':
        this.pokemon = 'nidoranm';
        break;
      default:
        break;
    }
  }


  render() {
    const { player } = this.props;
    const { onePokemon } = this.state;
    if (onePokemon.types) {
      if (onePokemon.types[1]) {
        this.pokemonType = onePokemon.types[1].type.name;
      } else {
        this.pokemonType = onePokemon.types[0].type.name;
      }
    } else {
      this.pokemonType = undefined;
    }
    this.classType = this.pokemonType;
    if (player === 'player1') {
      this.classType = this.pokemonType;
    }
    if (player === 'player2') {
      this.classType = `${this.pokemonType}2`;
    }
    return (
      <div className={this.classType}>
        <div
          className={this.pokemonClass}
        >
          <div>
            {this.pokemonType !== undefined ? <img className="imgelem" src={`./assets/pokemons/elements/${this.pokemonType}.png`} alt={this.pokemon} /> : <img className="loadingType" src="./assets/loading.png" alt="loading" />}
          </div>
          <div>
            <img
              className="sprites"
              src={`http://pokestadium.com/sprites/xy/${this.pokemon}.gif`}
              alt={this.pokemon}
            />
          </div>
          <div className="align-bottom">
            {this.pokemon}
            <span>
              {this.pokemonNumber}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
