import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const { name } = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const cleanLocalStorage = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

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
      <h2 data-testid="customer_products__element-navbar-user-full-name">{ name }</h2>
      <button
        type="button"
        onClick={ cleanLocalStorage }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </header>
  );
}

export default Header;
