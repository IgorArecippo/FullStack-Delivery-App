import React, { useState } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  const [test] = useState('test');
  return (
    <deliveryContext.Provider value={ test }>
      { children }
    </deliveryContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
