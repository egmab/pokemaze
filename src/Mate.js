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
    <div className="mateContainer" style={{ marginRight: '4vw' }}>
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
      <div className="starsContainer">
        {pokemon !== 'none'
          ? levelIcons.map((star, index) => (
            <div
              className={star}
              key={`starId-${index + 1}`}
              alt={star}
              style={{ backgroundColor: 'rgba(190, 217, 241)', borderRadius: 100 }}
            />
          ))
          : undefined
        }
      </div>
    </div>
  );
};


export default Mate;
