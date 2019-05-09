import React from 'react';

const Mate = ({ pokemon, newvalue, level }) => {
  const levelIcons = [];
  for (let i = 0; i < 3; i += 1) {
    if (i < level) {
      levelIcons.push('star');
    } else {
      levelIcons.push('emptyStar');
    }
  }
  return (
    <div className="mateContainer">
      <h6>Choose your team mate</h6>
      <p>Select a pokemon in your pokedex</p>
      <div className="pokeAndElement">
        <div className="pokemon">
          {pokemon !== 'none'
            ? (
              <img
                src={`http://pokestadium.com/sprites/xy/${pokemon}.gif`}
                alt={pokemon}
              />
            )
            : (
              <img
                src="./assets/pokemons/unknow.png"
                alt="none"
              />
            )
          }
        </div>
        {pokemon !== 'none'
          ? <img alt={newvalue} className="elem" src={`./assets/pokemons/elements/${newvalue}.png`} />
          : undefined
        }
      </div>
      <div className="starsContainerPok">
        {pokemon !== 'none'
          ? levelIcons.map((star, index) => (
            <div
              className={star}
              key={`starId-${index + 1}`}
              alt={star}
            />
          ))
          : undefined
        }
      </div>
    </div>
  );
};


export default Mate;
