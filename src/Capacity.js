import React from 'react';

const Capacity = (props) => {
  const { timer, maxtimer } = props;
  const progress = timer * 100 / maxtimer;
  return (
    <div style={{
      backgroundImage: 'url("./assets/pokemons/elements/normal.png")',
      backgroundSize: 'contain',
      width: '100%',
      height: '100%',
    }}
    >
      <div style={{
        height: `${progress}%`,
        filter: 'grayscale(1)',
        zIndex: '2',
        backgroundImage: 'url("./assets/pokemons/elements/normal.png")',
        backgroundSize: '100%',
        transition: '1000ms linear',
      }}
      />
    </div>
  );
};

export default Capacity;
