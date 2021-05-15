import React from 'react';
import { Link } from 'react-router-dom';
import './MessageDetail.css';

const MessageDetail = ({ firstName, username, createdDateTime, message }) => {
  return (
    <div className='message__container'>
      <div className='message_user-info d-flex w-100 flex-row'>
        <Link to={`/users/${username}`} className='message__name-link'>
          <strong className='message__name pe-3'>{firstName}</strong>
        </Link>
        <small className='message__handle d-flex align-content-end'>
          <span className='p-0'>@{username}</span>
        </small>
        <time className='message__time ms-auto'>
          {new Date(createdDateTime).toLocaleString()}
        </time>
      </div>
      <p className='message__message mt-2'>{message}</p>
    </div>
  );
};

export default MessageDetail;
