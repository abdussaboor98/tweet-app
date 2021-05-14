import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user-context';
import { getAllTweets } from '../../services/api-service';
import Loader from '../Layout/Loader';
import Tweet from '../Tweet/Tweet';

const TweetList = () => {
  const { loggedInUser, token } = useContext(UserContext);
  const [tweets, setTweets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllTweets(token)
      .then((res) => {
        setTweets(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch();
  }, [token]);
  return (
    <>
      {isLoading ? (
        <Loader size='2rem' />
      ) : (
        <>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </>
      )}
    </>
  );
};

export default TweetList;
