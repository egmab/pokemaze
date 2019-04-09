import React from 'react';

const GeneratePokemon = ({ selectPokemon }) => {
    return (
        <div className="GeneratePokemon">
            <button onClick={selectPokemon}>Get pokemon</button>
        </div>
    );
};

export default GeneratePokemon
