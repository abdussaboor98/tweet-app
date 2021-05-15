import React, { useContext, useState } from 'react';
import Comment from '../Comment/Comment';
import MessageEditor from '../MessageEditor/MessageEditor';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../context/user-context';
import './CommentList.css';
import { addComment } from '../../actions';

const CommentList = ({ comments, tweetId }) => {
  const dispatch = useDispatch();
  const { loggedInUser, token } = useContext(UserContext);
  const [newCommentMessage, setNewCommentMessage] = useState('');
  const handlePostComment = () => {
    dispatch(addComment(loggedInUser, newCommentMessage, tweetId, token));
    setNewCommentMessage('');
  };
  return (
    <div className='comments__container d-flex w-100'>
      <div className='comments__sideline'></div>
      <div className='w-100'>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <Comment comment={comment} />
            </div>
          );
        })}
        <MessageEditor
          handleOnSubmit={handlePostComment}
          message={newCommentMessage}
          setMessage={setNewCommentMessage}
          buttonMessage='Comment'
          placeholder='Share your thoughts on this here...'
        />
      </div>
    </div>
  );
};

export default CommentList;
