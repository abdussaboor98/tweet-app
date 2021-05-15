import React from 'react';

const MessageDetail = ({ firstName, username, createdDateTime, message }) => {
  return (
    <div>
      <div className='tweet_user-info d-flex w-100 flex-row'>
        <strong className='tweet__name pe-3'>{firstName}</strong>
        <small className='tweet__handle d-flex align-content-end'>
          <span className='p-0'>@{username}</span>
        </small>
        <time className='tweet__time ms-auto'>
          {new Date(createdDateTime).toLocaleString()}
        </time>
      </div>
      <p className='tweet__message mt-2'>{message}</p>
    </div>
  );
};

export default MessageDetail;
