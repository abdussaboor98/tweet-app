import React, { useContext, useEffect, useState } from 'react';
import './UserDetail.css';
import profile from '../../assets/profile.svg';
import { Link } from 'react-router-dom';

const UserDetail = ({ user }) => {
  return (
    <div className='row p-5 user__container'>
      <div className='col-md-3'>
        <div className='user__profile '>
          <img
            src={profile}
            alt=''
            className='img-thumbnail rounded-circle user__profile-img'
          />
        </div>
      </div>
      <div className='col-md-9'>
        <div className='user__details'>
          <Link to={`/users/${user.username}`} className='user__name-link'>
            <h2 className='mt-3 mb-0'>{`${user.firstName} ${
              user.lastName || ''
            }`}</h2>
          </Link>
          <div className='mt-0 pt-0'>@{user.username}</div>
          <div className='mt-2'>
            <span>Phone Number:</span>
            <span className='ms-2'>{user.phoneNo}</span>
          </div>
          <div className='mt-2'>
            <span>Email:</span>
            <span className='ms-2'>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
