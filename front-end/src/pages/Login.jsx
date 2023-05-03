import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [btnDisabled, setDisabled] = useState(true);

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
  }, [password, email]);

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  const handleClick = () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
  };

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
      <Link to="/produtos">
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ btnDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </Link>
      <Link to="/cadatro">
        <button
          type="button"
          data-testid="common_login__button-register"
          disabled={ btnDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </Link>
      <p data-testid="common_login__element-invalid-email"> a definir</p>
    </form>
  );
}
