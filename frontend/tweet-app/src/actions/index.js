import {
  fetchAllTweetsApi,
  fetchUserTweetsApi,
  likeTweetApi,
  postNewCommentApi,
  postNewTweetApi,
  updateTweetApi,
} from '../services/api-service';
import {
  ADD_TWEET,
  COMMENT_ON_TWEET,
  LIKE_TWEET,
  SET_TWEETS,
  UPDATE_TWEET,
} from './actionTypes';

export const setTweets = (tweets) => {
  return {
    type: SET_TWEETS,
    payload: tweets,
  };
};

export const updateTweet = (tweetId, updatedTweet) => {
  return {
    type: UPDATE_TWEET,
    payload: {
      tweetId,
      updatedTweet,
    },
  };
};

export const getAllTweets = (token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetchAllTweetsApi(token)
        .then((res) => {
          dispatch(setTweets(res.data));
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };
};

export const getUserTweets = (username, token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetchUserTweetsApi(username, token)
        .then((res) => {
          dispatch(setTweets(res.data));
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };
};

export const likeTweet = (username, tweetId, token) => {
  return (dispatch) => {
    likeTweetApi(username, tweetId, token)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: LIKE_TWEET,
            payload: {
              tweetId: tweetId,
              username: username,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addTweet = (username, message, token) => {
  return (dispatch) => {
    postNewTweetApi(username, message, token)
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: ADD_TWEET,
            payload: {
              newTweet: res.data,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addComment = (username, message, tweetId, token) => {
  return (dispatch) => {
    postNewCommentApi(username, message, tweetId, token)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateTweet(tweetId, res.data));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const editTweet = (username, message, tweetId, token) => {
  return (dispatch) => {
    updateTweetApi(username, message, tweetId, token)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateTweet(tweetId, res.data));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
