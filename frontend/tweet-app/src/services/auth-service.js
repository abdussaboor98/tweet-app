import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const login = (username, password) => {
  console.log(baseUrl + 'login');
  console.log({
    username,
    password,
  });
  return axios.post(baseUrl + 'login', {
    username,
    password,
  });
};
