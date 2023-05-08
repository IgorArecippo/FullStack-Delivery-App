import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestLogin, setLocalStorage } from '../services/requests';

export default function Login() {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [btnDisabled, setDisabled] = useState(true);
  // const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  useEffect(() => {
    const validateLogin = () => {
      const minLength = 5;
      const regexEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
      if (regexEmail.test(email) && password.length > minLength) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    validateLogin();
  }, [email, password]);

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });
      setLocalStorage(token);

      // const { role } = await requestData('/login/role', { email, password });

      localStorage.setItem('token', token);

      // setIsLogged(true);
      history.push('/customer/products');
    } catch (error) {
      setFailedTryLogin(true);
      // setIsLogged(false);
    }
  };

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  // const handleClick = () => {
  //   const user = { email };
  //   localStorage.setItem('user', JSON.stringify(user));
  // };

  return (
    <form>
      <h2>Login</h2>
      <input
        type="email"
        data-testid="common_login__input-email"
        placeholder="Email"
        onChange={ ({ target }) => handleChange(target.value, setEmail) }
      />
      <input
        type="password"
        data-testid="common_login__input-password"
        placeholder="Password"
        onChange={ ({ target }) => handleChange(target.value, setPassword) }
      />
      <div>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ btnDisabled }
          onClick={ (event) => login(event) }
        >
          Login
        </button>
      </div>
      <Link to="/register">
        <button
          type="button"
          data-testid="common_login__button-register"
          // disabled={ btnDisabled }
        >
          Cadastre-se
        </button>
      </Link>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
