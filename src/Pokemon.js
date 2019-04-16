import React, { Component } from 'react';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onePokemon: '',
    };
  }

  render() {
    let pokemon = this.props.pokemonName;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          onePokemon: data,
        });
      });
    const pokemonType = this.state.onePokemon.types ? this.state.onePokemon.types[0].type.name : 'unknown';


    switch (pokemon) {
      case 'nidoran-f':
        pokemon = 'nidoranf';
        break;
      case 'nidoran-m':
        pokemon = 'nidoranm';
        break;
      case 'deoxys-normal':
        pokemon = 'deoxys';
        break;
      default:
        break;
    }

    return (
      <div
        className="pokemon-single-container"
      >
        <div>
          <img
            className="sprites"
            src={`http://pokestadium.com/sprites/xy/${pokemon}.gif`} alt={pokemon}
          />
          <div className="align-bottom"> {pokemon}</div>
          <div className="align-bottom"> {pokemonType}</div>
        </div>
      </div>
    );
  }
}
export default Pokemon;