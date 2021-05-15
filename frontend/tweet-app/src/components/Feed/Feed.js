import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTweet, getAllTweets } from '../../actions';
import { UserContext } from '../../context/user-context';
import Loader from '../Layout/Loader';
import MessageEditor from '../MessageEditor/MessageEditor';
import TweetList from '../TweetList/TweetList';

const Feed = () => {
  const dispatch = useDispatch();
  const { loggedInUser, token } = useContext(UserContext);
  const [newTweetMessage, setNewTweetMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllTweets(token)).then(() => {
      setIsLoading(false);
    });
  }, [token]);

  const handlePostTweet = () => {
    dispatch(addTweet(loggedInUser, newTweetMessage, token));
    setNewTweetMessage('');
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
        {isLoading ? (
          <Loader size='2rem' />
        ) : (
          <TweetList tweetsLoaded={!isLoading} />
        )}
      </div>
    </>
  );
};

export default Feed;
