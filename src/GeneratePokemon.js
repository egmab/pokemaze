import React from 'react';

const GeneratePokemon = ({ selectPokemon }) => (
  <div className="GeneratePokemon">
    <button type="button" onClick={selectPokemon}>Get pokemon</button>
  </div>
);

export default GeneratePokemon;
