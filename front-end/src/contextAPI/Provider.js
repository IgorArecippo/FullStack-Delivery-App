import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  const [results, setResults] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersCarrinho, setOrdersCarrinho] = useState([]);

  const context = useMemo(() => ({
    results,
    setResults,
    carrinho,
    setCarrinho,
    totalPrice,
    setTotalPrice,
    orders,
    setOrders,
    ordersCarrinho,
    setOrdersCarrinho,
  }), [results, carrinho, totalPrice, orders, ordersCarrinho]);
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
