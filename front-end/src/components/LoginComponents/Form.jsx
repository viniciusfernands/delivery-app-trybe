import React, { useEffect, useState, useContext } from 'react';
import { StatusCodes } from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

import { postLogin } from '../../services';
import { setUserLS } from '../../services/localStorage';
import { validateLogin } from '../utils/utils';
import inputsDatas from '../utils/inputsDatas';
import GenericInput from '../GenericInput';

function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [response, setResponse] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const { token, role, setUser, initializeUser } = useContext(Context);

  const goTo = useHistory();

  const handleInputLogin = ({ target }) => {
    setUserEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setUserPassword(target.value);
  };

  const handleStatusLogin = async (event) => {
    event.preventDefault();
    const res = await postLogin(userEmail, userPassword);
    setResponse(res);
    if (res.token) {
      setLoginStatus(true);
    }
  };

  useEffect(() => {
    initializeUser();
    if (!token && loginStatus) {
      setUser(response);
      setUserLS(response);
    }
    if (role) {
      switch (role) {
      case 'seller':
        goTo.push('/seller/orders');
        break;
      case 'administrator':
        goTo.push('/admin/manage');
        break;
      default:
        goTo.push('/customer/products');
      }
    }
  }, [goTo, loginStatus, response, setUser, initializeUser, token, role]);

  return (
    <div>
      <img alt="imagem do nosso logo" />
      <form>
        <GenericInput
          data={ inputsDatas.Login }
          value={ userEmail }
          handler={ handleInputLogin }
        />

        <GenericInput
          data={ inputsDatas.Password }
          value={ userPassword }
          handler={ handleInputPassword }
        />

        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ validateLogin(userEmail, userPassword) }
          onClick={ (event) => handleStatusLogin(event) }
        >
          LOGIN
        </button>

        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => goTo.push('/register') }
        >
          Ainda n??o tenho conta
        </button>

        {response === StatusCodes.NOT_FOUND && (
          <span data-testid="common_login__element-invalid-email">
            Usu??rio n??o encontrado
          </span>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
