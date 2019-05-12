import React, { Component } from 'react';

export const PokedexContext = React.createContext();

class PokedexProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  componentWillMount() {
    this.getPokemon();
  }

  getPokemon() {
    const pokedex = [];
    for (let i = 0; i < 151; i += 1) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        .then(response => response.json())
        .then((data) => {
          let pokemonType = '';
          if (data.types) {
            if (data.types[1]) {
              pokemonType = data.types[1].type.name;
            } else {
              pokemonType = data.types[0].type.name;
            }
          }
          pokedex[i] = { name: data.name, type: pokemonType };
          if (pokedex.length === 151) {
            this.setState({
              pokemons: pokedex,
            });
          }
        });
    }
  }


  render() {
    const { children } = this.props;
    return (
      <PokedexContext.Provider value={this.state}>
        {children}
      </PokedexContext.Provider>
    );
  }
}

export default PokedexProvider;
