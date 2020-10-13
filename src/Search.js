import React from 'react';

const Search = ({ handleChange }) => (
  <input className="searchBar" type="text" placeholder="Search by pokemon name" onChange={event => handleChange(event.target.value)} />
);

export default Search;
