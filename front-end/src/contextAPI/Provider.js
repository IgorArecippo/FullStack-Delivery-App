import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  const [results, setResults] = useState([]);

  const context = useMemo(() => ({
    results,
    setResults,
  }), [results]);
  return (
    <deliveryContext.Provider value={ context }>
      { children }
    </deliveryContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
