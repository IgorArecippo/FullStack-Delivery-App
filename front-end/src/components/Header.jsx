import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const name = localStorage.getItem('name');
  return (
    <header className="header">
      <Link to="/customer/products">
        <h3
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </h3>
      </Link>
      <Link to="/customer/orders">
        <h3
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </h3>
      </Link>
      <h2 data-testid="customer_products__element-navbar-user-full-name">{name}</h2>
      <Link to="/login">
        <h3
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </h3>
      </Link>
    </header>
  );
}

export default Header;
