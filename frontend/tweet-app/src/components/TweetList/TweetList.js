import React from 'react';
import { useSelector } from 'react-redux';
import Tweet from '../Tweet/Tweet';

const TweetList = () => {
  const tweets = useSelector((state) => state.tweets);
  return (
    <>
      {tweets.length < 1 ? (
        <div className='w-100 text-center my-5'>No tweets posted yet</div>
      ) : (
        tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      )}
    </>
  );
};

export default TweetList;
