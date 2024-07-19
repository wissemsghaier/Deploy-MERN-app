import React from 'react';
import { Button } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="header">
      {isAuthenticated ? (
        <Button type="primary" onClick={logout}>Logout</Button>
      ) : (
        <Button type="primary" onClick={() => login('email', 'password')}>Login</Button>
      )}
    </div>
  );
};

export default Header;
