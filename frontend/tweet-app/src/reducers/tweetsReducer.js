import {
  ADD_TWEET,
  LIKE_TWEET,
  SET_TWEETS,
  UPDATE_TWEET,
} from '../actions/actionTypes';

const initialTweetsState = [];

export const tweetsReducer = (state = initialTweetsState, action) => {
  switch (action.type) {
    case SET_TWEETS:
      return action.payload;
    case LIKE_TWEET:
      return toggeledLikeState(
        state,
        action.payload.username,
        action.payload.tweetId
      );
    case ADD_TWEET:
      return [action.payload.newTweet, ...state];
    case UPDATE_TWEET:
      return getStateWithUpdatedTweet(
        state,
        action.payload.tweetId,
        action.payload.updatedTweet
      );

    default:
      return state;
  }
};

const toggeledLikeState = (state, username, tweetId) => {
  return [...state].map((tweet) => {
    if (tweet.id === tweetId) {
      const index = tweet.likedUsernames.indexOf(username);
      if (index === -1) {
        tweet.likedUsernames.push(username);
      } else {
        tweet.likedUsernames.pop(index);
      }
    }
    return tweet;
  });
};

const getStateWithUpdatedTweet = (state, tweetId, updatedTweet) => {
  return [...state].map((tweet) => {
    if (tweet.id === tweetId) {
      return updatedTweet;
    }
    return tweet;
  });
};
