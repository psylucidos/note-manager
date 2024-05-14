import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  toggleIsLogin: () => void;
}

const Login: React.FC<Props> = ({ toggleIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:3001/auth/login', { username, password })
      .then((response) => console.log(response.data))
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
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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