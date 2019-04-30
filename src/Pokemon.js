import React, { Component } from 'react';


class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onePokemon: '',
    };
    const { pokemonName, pokemonsCaught } = this.props;
    this.pokemon = pokemonName;
    this.caught = pokemonsCaught;
  }

  componentWillMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          onePokemon: data,
        });
      });
  }


  render() {
    const { pokemonName, player } = this.props;
    let pokemonClass = 'notHave';
    for (let i = 0; i < this.caught.length; i += 1) {
      if (this.caught[i].name === pokemonName) {
        pokemonClass = 'pokemon-single-container';
        break;
      } else {
        pokemonClass = 'notHave';
      }
    }

    const { onePokemon } = this.state;
    let pokemonType = '';
    if (onePokemon.types) {
      if (onePokemon.types[1]) {
        pokemonType = onePokemon.types[1].type.name;
      } else {
        pokemonType = onePokemon.types[0].type.name;
      }
    } else {
      pokemonType = undefined;
    }

    let pokemonNumber = 0;
    for (let i = 0; i < this.caught.length; i += 1) {
      if (this.caught[i].name === pokemonName) {
        pokemonNumber += 1;
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
    let classType = pokemonType;
    if (player === 'player1') {
      classType = pokemonType;
    }
    if (player === 'player2') {
      classType = `${pokemonType}2`;
    }
    return (
      <div className={classType}>
        <div
          className={pokemonClass}
        >
          <div>
            {pokemonType !== undefined ? <img className="imgelem" src={`./assets/pokemons/elements/${pokemonType}.png`} alt={this.pokemon} /> : <img className="loadingType" src="./assets/loading.png" alt="loading" />}
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
              {pokemonNumber}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
