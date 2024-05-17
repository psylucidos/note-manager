import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setID, setToken, setUsername } from '../store/authslice';
import axios from 'axios';

interface Props {
  toggleIsLogin: () => void;
}

const Login: React.FC<Props> = ({ toggleIsLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:3001/auth/login', { user: email.split('@')[0], email: email, password })
      .then((response) => {
        console.log(response.data);
        if(response.data.access_token.length > 1) {
          dispatch(setToken(response.data.access_token));
          dispatch(setID(response.data.id));
          navigate('/notes');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <a href="#" onClick={toggleIsLogin}>
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;