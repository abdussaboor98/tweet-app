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

export const updateForgotPassword = (username, newPassword) => {
  return axios.patch(baseUrl + username + '/forgot', { value: newPassword });
};

export const fetchUserDetailApi = (username, token) => {
  return axios.get(baseUrl + 'user/' + username, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const fetchAllUsersDetailsApi = (token) => {
  return axios.get(baseUrl + 'users/all', {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const searchUsersDetailsApi = (partialUsername, token) => {
  return axios.get(baseUrl + 'users/search/' + partialUsername, {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const fetchAllTweetsApi = (token) => {
  return axios.get(baseUrl + 'all', {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const fetchUserTweetsApi = (username, token) => {
  return axios.get(baseUrl + username + '/all', {
    headers: { Authorization: 'Bearer ' + token },
  });
};

export const likeTweetApi = (username, tweetId, token) => {
  return axios.patch(
    `${baseUrl}${username}/like/${tweetId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postNewTweetApi = (username, message, token) => {
  return axios.post(
    `${baseUrl}${username}/add`,
    {
      value: message,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postNewCommentApi = (username, message, tweetId, token) => {
  return axios.post(
    `${baseUrl}${username}/reply/${tweetId}`,
    {
      value: message,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateTweetApi = (username, message, tweetId, token) => {
  return axios.patch(
    `${baseUrl}${username}/update/${tweetId}`,
    {
      value: message,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
