import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';


const EndingGame = ({
  pokemon, isWinner, isLoser, reset, winner,
}) => {
  let pokemonName = pokemon.name;
  const pokemonNameMaj = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  // const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
  let winnerName = 'winner';
  let title = '';
  let message = '';
  if (isWinner) {
    if (winner === 'player1') {
      winnerName = JSON.parse(localStorage.getItem('connectedPlayer'))
    }
    if (winner === 'player2') {
      winnerName = JSON.parse(localStorage.getItem('connectedPlayer2'))
    }
    title = `Congrats ${winnerName}!`;
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
        <h5>{title}</h5>
        <img className="imgPoke" src={`http://pokestadium.com/sprites/xy/${pokemonName}.gif`} alt={pokemonName} />
        <h3>
          {message}
          {' '}
          {pokemonNameMaj}
          {' '}
          !
        </h3>
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
