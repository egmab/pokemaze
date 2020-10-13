import React, { Component } from 'react';


class Pokemon extends Component {
  constructor(props) {
    super(props);
    const { pokemonName, pokemonsCaught } = this.props;
    this.pokemon = pokemonName;
    this.caught = pokemonsCaught;
    this.pokemonClass = undefined;
    this.type = undefined;
    this.pokemonNumber = 0;
    this.classType = undefined;
    this.style = {
      border: 'none',
    };
  }

  componentWillMount() {
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
        this.pokemon = 'nidoran_f';
        break;
      case 'nidoran-m':
        this.pokemon = 'nidoran_m';
        break;
      case 'deoxys-normal':
        this.pokemon = 'deoxys';
        break;
      case 'mr-mime':
        this.pokemon = 'mr.mime';
        break;
      default:
        break;
    }
  }

  selectedStyle = () => {
    this.style = {
      border: 'solid 3px red',
    };
  }

  render() {
    const {
      player, isClicked, game, pokemonType,
    } = this.props;
    this.type = pokemonType;
    this.classType = this.type;
    if (player === 'player1') {
      this.classType = this.type;
    }
    if (player === 'player2') {
      this.classType = `${this.type}2`;
    }
    return (
      <div className={this.classType}>
        <div
          className={this.pokemonClass}
          style={this.style}
          role="presentation"
          onClick={game === 'multi' && this.pokemonClass === 'pokemon-single-container' ? () => { isClicked(this.pokemon, this.type); this.selectedStyle(); } : undefined}
        >
          <div>
            {this.type !== undefined ? <img className="imgelem" src={`./assets/pokemons/elements/${this.type}.png`} alt={this.pokemon} /> : <img className="loadingType" src="./assets/loading.png" alt="loading" />}
          </div>
          <div>
            <img
              className="sprites"
              src={`https://projectpokemon.org/images/normal-sprite/${this.pokemon}.gif`}
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
