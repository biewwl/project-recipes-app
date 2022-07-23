import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import lS from 'manager-local-storage';
import './styles/Login.css';

function Login() {
  const history = useHistory();
  const [userInfos, setUserInfos] = useState({
    password: '',
    email: '',
  });

  const handleChange = ({ target }) => {
    setUserInfos({ ...userInfos, [target.name]: target.value });
  };

  const validateEmail = (email) => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  };

  const minPass = 7;

  const onLogin = () => {
    lS('s', {
      mealsToken: 1,
      cocktailsToken: 1,
      user: { email: userInfos.email },
    });
    history.push('/foods');
  };

  return (
    <article className="login">
      <form>
        <div>
          <h2>Welcome!</h2>
          <span>Login to continue</span>
        </div>
        <input
          data-testid="email-input"
          name="email"
          id="email"
          type="email"
          value={ userInfos.email }
          onChange={ handleChange }
          placeholder="Email"
          autoComplete="off"
        />
        <input
          data-testid="password-input"
          name="password"
          id="password"
          type="password"
          value={ userInfos.password }
          onChange={ handleChange }
          placeholder="Password"
        />
        <button
          disabled={
            userInfos.password.length < minPass
            || !validateEmail(userInfos.email)
          }
          data-testid="login-submit-btn"
          type="button"
          onClick={ onLogin }
        >
          Enter
        </button>
      </form>
    </article>
  );
}

export default Login;
