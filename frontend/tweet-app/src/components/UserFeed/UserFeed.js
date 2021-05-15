import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserTweets } from '../../actions';
import { UserContext } from '../../context/user-context';
import Loader from '../Layout/Loader';
import TweetList from '../TweetList/TweetList';

const UserFeed = ({ username }) => {
  const dispatch = useDispatch();
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserTweets(username, token)).then(() => {
      setIsLoading(false);
    });
  }, [username]);
  return <>{isLoading ? <Loader size='2rem' /> : <TweetList />}</>;
};

export default UserFeed;
