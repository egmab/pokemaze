import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';


const EndingGame = ({
  pokemon, isWinner, isLoser, winner, tutoWinner, timer, levelName, gameMode,
}) => {
  let pokemonName = pokemon.name;
  const pokemonNameMaj = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  // const pokemonSprite = pokemon.sprites ?pokemon.sprites.back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
  let winnerName = 'winner';
  let title = '';
  let message = '';
  if (isWinner) {
    if (winner === 'player1') {
      winnerName = JSON.parse(localStorage.getItem('connectedPlayer'));
      if (timer && levelName) {
        if (!localStorage.getItem('timers')) {
          localStorage.setItem('timers', '{}');
        }
        const timersdata = JSON.parse(localStorage.getItem('timers'));
        if (timersdata[levelName]) {
          const currentTimer = timersdata[levelName][0];
          if (currentTimer < timer) {
            timersdata[levelName] = [timer, winnerName];
            localStorage.setItem('timers', JSON.stringify(timersdata));
          }
        } else {
          timersdata[levelName] = [timer, winnerName];
          localStorage.setItem('timers', JSON.stringify(timersdata));
        }
      }
    }

    if (winner === 'player2') {
      winnerName = JSON.parse(localStorage.getItem('connectedPlayer2'));
    }
    title = `Congrats ${winnerName}!`;
    message = 'You win';
  }
  if (tutoWinner) {
    title = 'Congrats, you got it!';
    message = 'You would have won';
  }
  if (isLoser) {
    title = 'Too late !';
    message = 'You lose';
  }
  switch (pokemonName) {
    case 'nidoran-f':
      pokemonName = 'nidoran_f';
      break;
    case 'nidoran-m':
      pokemonName = 'nidoran_m';
      break;
    case 'deoxys-normal':
      pokemonName = 'deoxys';
      break;
    case 'mr-mime':
      pokemonName = 'mr.mime';
      break;
    default:
      break;
  }
  return (
    <div className="modal-wrapper">
      <div className="modal-body">
        <h5>{title}</h5>
        <img className="imgPoke" src={`https://projectpokemon.org/images/normal-sprite/${pokemonName}.gif`} alt={pokemonName} />
        <h4>
          {message}
          {' '}
          {pokemonNameMaj}
          {' '}
          !
        </h4>
        <p>
          {gameMode === 'solo'
            ? (
              <Link
                to="/solo-game"
              >
                <button
                  className="homeButton"
                  type="button"
                  size="lg"
                >
                  Play again
                </button>
              </Link>
            )
            : (
              <Link
                to="/duo-game"
              >
                <button
                  className="homeButton"
                  type="button"
                  size="lg"
                >
                  Play again
                </button>
              </Link>
            )
          }
        </p>
        <p>
          <Link to="/">
            <button
              className="backButton"
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
