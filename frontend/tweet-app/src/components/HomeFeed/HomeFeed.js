import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTweet, getAllTweets, addTweet } from '../../actions';
import { UserContext } from '../../context/user-context';
import Loader from '../Layout/Loader';
import MessageEditor from '../MessageEditor/MessageEditor';
import TweetList from '../TweetList/TweetList';
import SockJsClient from '../SockJsClient/SockJsClient';

const HomeFeed = () => {
  const dispatch = useDispatch();
  const { loggedInUser, token } = useContext(UserContext);
  const [newTweetMessage, setNewTweetMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllTweets(token)).then(() => {
      setIsLoading(false);
    });
  }, []);

  const handlePostTweet = () => {
    dispatch(postTweet(loggedInUser, newTweetMessage, token));
    setNewTweetMessage('');
  };

  const handleNewTweetMessage = (newTweet) => {
    if (newTweet.username !== loggedInUser) {
      dispatch(addTweet(newTweet));
    }
  };

  return (
    <>
      <div className='row'>
        <MessageEditor
          handleOnSubmit={handlePostTweet}
          message={newTweetMessage}
          setMessage={setNewTweetMessage}
          buttonMessage='Post'
          placeholder='Share whats on your mind!!'
        />
      </div>
      <div className='row'>
        {isLoading ? <Loader size='2rem' /> : <TweetList />}
      </div>
      <SockJsClient
        url={process.env.REACT_APP_WS_CONNECT_URL}
        subscribeEndpoint={process.env.REACT_APP_WS_TWEETS_SUB_EP}
        headers={{ Authorization: 'Bearer ' + token }}
        onMessage={handleNewTweetMessage}
      />
    </>
  );
};

export default HomeFeed;
