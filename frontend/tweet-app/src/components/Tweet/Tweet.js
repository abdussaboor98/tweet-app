import React from 'react';
import profile from '../../assets/profile.png';
import './Tweet.css';

const Tweet = ({ tweet }) => {
  console.log(tweet);
  return (
    <div className='tweet__container d-flex p-3'>
      <div className='tweet__left'>
        <div className='tweet__avatar-container mt-3 mx-auto text-center'>
          <img
            className='tweet__avatar rounded-circle'
            src={profile}
            alt={tweet.username}
          />
        </div>
      </div>
      <div className='tweet__right p-3 flex-grow-1'>
        <div className='tweet_user-info d-flex w-100 flex-row'>
          <strong className='tweet__name pe-3'>{tweet.firstName}</strong>
          <small className='tweet__handle'>@{tweet.username}</small>
          <span className='px-3'>.</span>
          <time className='tweet__time ms-auto'>
            {new Date(tweet.createdDateTime).toLocaleString()}
          </time>
        </div>
        <div className='tweet__message'>{tweet.message}</div>
        <div className='tweet__likes'>{tweet.likedUsernames.length}</div>
      </div>
    </div>
  );
};

export default Tweet;
