import React, { useState, createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const localStgUser = JSON.parse(localStorage.getItem('user'));
  const localStgToken = JSON.parse(localStorage.getItem('token'));
  const [loggedInUser, setLoggedInUser] = useState(localStgUser || null);
  const [token, setToken] = useState(localStgToken || null);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const saveUser = (user) => {
    localStorage.setItem('user', user);
    setLoggedInUser(user);
  };

  const value = {
    loggedInUser,
    setLoggedInUser: saveUser,
    token,
    setToken: saveToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
