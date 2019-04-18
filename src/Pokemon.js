import React, { Component } from 'react';


class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onePokemon: '',
    };
    const { pokemonName } = this.props;
    this.pokemon = pokemonName;
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
    const { onePokemon } = this.state;
    let pokemonType = '';
    if (onePokemon.types) {
      if (onePokemon.types[1]) {
        pokemonType = onePokemon.types[1].type.name;
      } else {
        pokemonType = onePokemon.types[0].type.name;
      }
    } else {
      pokemonType = '';
    }

    // this.pokemonType = onePokemon.types
    // ? onePokemon.types[0].type.name : "undefined";

    switch (this.pokemon) {
      case 'nidoran-f':
        this.pokemon = 'nidoranf';
        break;
      case 'nidoran-m':
        this.pokemon = 'nidoranm';
        break;
      case 'deoxys-normal':
        this.pokemon = 'deoxys';
        break;
      default:
        break;
    }

    return (
      <div
        className="pokemon-single-container"
      >
        <div>
          <img className="imgelem" src={`./assets/pokemons/elements/${pokemonType}.png`} alt={this.pokemon} />
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
        </div>
      </div>
    );
  }
}

export default Pokemon;
