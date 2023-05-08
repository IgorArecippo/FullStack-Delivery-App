import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
      <h2 data-testid="customer_products__element-navbar-user-full-name">username</h2>
      <Link to="/customer/login">
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
