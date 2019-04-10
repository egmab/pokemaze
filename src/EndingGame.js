import React from 'react';


const EndingGame = ({ pokemon, isWinner, isLoser }) => {
  let pokemonName = pokemon.name;
  // const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
  let title = '';
  let message = '';
  if (isWinner) {
    title = 'Congrats !';
    message = 'You win';
  }
  if (isLoser) {
    title = 'Congrats !';
    message = 'You win';
  }

  switch (pokemonName) {
    case 'nidoran-f':
      pokemonName = 'nidoranf';
      break;
    case 'nidoran-m':
      pokemonName = 'nidoranm';
      break;
    case 'deoxys-normal':
      pokemonName = 'deoxys';
      break;
    default:
      break;
  }
  return (
    <div className="EndingGame">
      <h3>{title}</h3>
      <img src={`http://pokestadium.com/sprites/xy/${pokemonName}.gif`} alt={pokemonName} />
      <p>
        {message}
        {' '}
        {pokemonName}
        {' '}
        !
      </p>
    </div>
  );
};

export default EndingGame;
