import React, { Component } from 'react';


class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onePokemon: '',
    };
    this.pokemon = this.props.pokemonName;

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
    let pokemonType = ""
    if (this.state.onePokemon.types){
      if (this.state.onePokemon.types[1]){
        pokemonType = this.state.onePokemon.types[1].type.name
      }
      else {
        pokemonType = this.state.onePokemon.types[0].type.name
      }
    }
    else{
      pokemonType = ""
    }

    //this.pokemonType = this.state.onePokemon.types ? this.state.onePokemon.types[0].type.name : "undefined";

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
        <img className='imgelem' src={`./assets/pokemons/elements/${pokemonType}.png`} alt ={this.pokemon} />
        </div>
        <div>
          <img
            className="sprites"
            src={`http://pokestadium.com/sprites/xy/${this.pokemon}.gif`} alt={this.pokemon}
          />
        </div>
        <div className="align-bottom"> {this.pokemon} </div>
      </div>
    );
  }
}
export default Pokemon;