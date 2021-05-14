import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const login = (username, password) => {
  return axios.post(baseUrl + 'login', {
    username,
    password,
  });
};

export const register = (user) => {
  return axios.post(baseUrl + 'register', user);
};

export const getUserDetail = (username, token) => {
  return axios.get(baseUrl + 'user/' + username, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const getAllTweets = (token) => {
  return axios.get(baseUrl + 'all', {
    headers: { Authorization: 'Bearer ' + token },
  });
};
