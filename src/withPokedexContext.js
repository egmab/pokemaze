import React from 'react';
import { PokedexContext } from './PokedexProvider';

const withPokedexContext = OutComponent => props => (
  <PokedexContext.Consumer>
    {value => <OutComponent {...props} {...value} />}
  </PokedexContext.Consumer>
);

export default withPokedexContext;
