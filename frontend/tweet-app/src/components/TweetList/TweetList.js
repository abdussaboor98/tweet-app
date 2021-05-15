import React from 'react';
import { useSelector } from 'react-redux';
import Tweet from '../Tweet/Tweet';

const TweetList = () => {
  const tweets = useSelector((state) => state.tweets);
  return (
    <>
      {tweets.length < 1
        ? 'No tweets posted yet'
        : tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
    </>
  );
};

export default TweetList;
