import React, { useContext, useState } from 'react';
import profile from '../../assets/profile.png';
import './Tweet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/user-context';
import { likeTweet } from '../../actions';
import { useDispatch } from 'react-redux';
import CommentList from '../CommentList/CommentList';
import MessageDetail from '../MessageDetail/MessageDetail';
import EditTweet from '../EditTweet/EditTweet';

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const { loggedInUser, token } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const toggleEditTweet = () => {
    setIsEditing((prevstate) => !prevstate);
  };
  return (
    <>
      <div className='tweet__container'>
        <div className='d-flex p-3 pb-0 flex-nowrap'>
          <div className='tweet__left'>
            <div className='tweet__avatar-container mt-3 mx-auto text-center'>
              <img
                className='tweet__avatar img-thumbnail rounded-circle'
                src={profile}
                alt={tweet.username}
              />
            </div>
          </div>
          <div className='tweet__right p-3 w-100'>
            <MessageDetail
              firstName={tweet.firstName}
              username={tweet.username}
              createdDateTime={tweet.createdDateTime}
              message={isEditing || tweet.message}
            />
            {isEditing && (
              <EditTweet tweet={tweet} changeEditState={setIsEditing} />
            )}
            <div className='w-100 text-end '>
              <small className='fw-light fst-italic'>
                {tweet.edited && 'edited'}
              </small>
            </div>
          </div>
        </div>
        <div className='tweet__bottombar row'>
          {/* Comment */}
          <button className='tweet__actions col' onClick={toggleShowComments}>
            <FontAwesomeIcon
              icon={faComment}
              className='tweet__action-icon'
            ></FontAwesomeIcon>
            {tweet.comments.length}
          </button>
          {/* Edit */}
          <button
            className={`tweet__actions col ${
              loggedInUser !== tweet.username ? 'disabled' : ''
            }`}
            disabled={loggedInUser !== tweet.username}
            onClick={toggleEditTweet}
          >
            <FontAwesomeIcon
              icon={faEdit}
              className='tweet__action-icon m-0'
            ></FontAwesomeIcon>
          </button>
          {/* Like */}
          <button
            className='tweet__actions col'
            onClick={() => {
              dispatch(likeTweet(loggedInUser, tweet.id, token));
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={tweet.likedUsernames.includes(loggedInUser) ? 'red' : ''}
              className='tweet__action-icon'
            ></FontAwesomeIcon>
            {tweet.likedUsernames.length}
          </button>
        </div>
      </div>
      {showComments && (
        <div className='tweet__comments'>
          <CommentList comments={tweet.comments} tweetId={tweet.id} />
        </div>
      )}
    </>
  );
};

export default Tweet;
