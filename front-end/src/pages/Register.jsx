import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestRegister, setLocalStorage } from '../services/requests';

export default function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [btnDisabled, setDisabled] = useState(true);
  const [failedTryRegister, setFailedTryRegister] = useState(false);

  useEffect(() => {
    const validateLogin = () => {
      const minLength = 5;
      const minLengthName = 11;
      const regexEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
      if (regexEmail.test(email)
      && password.length > minLength
      && name.length > minLengthName) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    validateLogin();
  }, [email, password, name]);

  const register = async (event) => {
    event.preventDefault();

    try {
      const data = await requestRegister('/register', { email, name, password });
      const { role, token, id } = data;
      setLocalStorage(role, token);

      localStorage.setItem('user', JSON.stringify({
        token, email, name, role: 'customer', id,
      }));

      history.push('/customer/products');
    } catch (error) {
      setFailedTryRegister(true);
    }
  };

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  return (
    <form>
      <h2>Cadastro</h2>
      <input
        type="name"
        data-testid="common_register__input-name"
        placeholder="Name"
        onChange={ ({ target }) => handleChange(target.value, setName) }
      />
      <input
        type="email"
        data-testid="common_register__input-email"
        placeholder="Email"
        onChange={ ({ target }) => handleChange(target.value, setEmail) }
      />
      <input
        type="password"
        data-testid="common_register__input-password"
        placeholder="Password"
        onChange={ ({ target }) => handleChange(target.value, setPassword) }
      />
      <div>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ btnDisabled }
          onClick={ register }
        >
          Cadastrar
        </button>
      </div>
      {
        (failedTryRegister)
          ? (
            <p data-testid="common_register__element-invalid_register">
              O usuário já está cadastrado.
            </p>
          )
          : null
      }
    </form>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
