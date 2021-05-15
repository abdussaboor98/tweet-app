import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTweet } from '../../actions';
import { UserContext } from '../../context/user-context';
import MessageEditor from '../MessageEditor/MessageEditor';

const EditTweet = ({ tweet, changeEditState }) => {
  const { loggedInUser, token } = useContext(UserContext);
  const dispatch = useDispatch();
  const [updatedTweetMessage, setUpdatedTweetMessage] = useState(tweet.message);

  const handleUpdateTweet = () => {
    dispatch(editTweet(loggedInUser, updatedTweetMessage, tweet.id, token));
    setUpdatedTweetMessage('');
    changeEditState(false);
  };
  return (
    <MessageEditor
      handleOnSubmit={handleUpdateTweet}
      message={updatedTweetMessage}
      setMessage={setUpdatedTweetMessage}
      buttonMessage='Update'
      placeholder='Share whats on your mind!!'
    />
  );
};

export default EditTweet;
