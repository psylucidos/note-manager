import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login toggleIsLogin={toggleIsLogin} />
      ) : (
        <Register toggleIsLogin={toggleIsLogin} />
      )}
    </div>
  );
};

export default Auth;