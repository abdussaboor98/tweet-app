import React from 'react';
import MessageDetail from '../MessageDetail/MessageDetail';
import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <div className='comment__container mt-3'>
      <MessageDetail
        firstName={comment.firstName}
        username={comment.username}
        createdDateTime={comment.createdDateTime}
        message={comment.message}
      />
    </div>
  );
};

export default Comment;
