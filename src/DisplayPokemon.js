import React from 'react';

const DisplayPokemon = ({ pokemon, message }) => {
  let pokemonName = pokemon.name
  //const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
  switch (pokemonName) {
    case "nidoran-f":
      pokemonName = "nidoranf";
      break;
    case "nidoran-m":
      pokemonName = "nidoranm";
      break;
    case "deoxys-normal":
      pokemonName = "deoxys";
      break;
    default:
      break;
  }
  return (
    <div className="DisplayPokemon">
      <img src={`http://pokestadium.com/sprites/xy/${pokemonName}.gif`} alt={pokemonName} />
      <h3>{message} {pokemonName} !</h3>
    </div>
  );
};

export default DisplayPokemon
