import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  const [results, setResults] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);

  const context = useMemo(() => ({
    results,
    setResults,
    carrinho,
    setCarrinho,
    totalPrice,
    setTotalPrice,
    orders,
    setOrders,
  }), [results, carrinho, totalPrice, orders]);
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
