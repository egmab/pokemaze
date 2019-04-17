import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';


const EndingGame = ({ pokemon, isWinner, isLoser, reset }) => {
  let pokemonName = pokemon.name;
  const pokemonNameMaj = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  // const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
  let title = '';
  let message = '';
  if (isWinner) {
    title = 'Congrats !';
    message = 'You win';
  }
  if (isLoser) {
    title = 'Too late !';
    message = 'You lose';
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
    <div className="modal-wrapper">
      <div className="modal-body">
        <h3>{title}</h3>
        <img className="imgPoke" src={`http://pokestadium.com/sprites/xy/${pokemonName}.gif`} alt={pokemonName} />
        <h2>
          {message}
          {' '}
          {pokemonNameMaj}
          {' '}
          !
        </h2>
        <p>
          <Link exact to="/" onClick={() => reset()}>
            <button
              className="largeBtn"
              type="button"
              size="lg"
            >
              Back to menu
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EndingGame;
