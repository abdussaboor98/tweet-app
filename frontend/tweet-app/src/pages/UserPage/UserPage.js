import React from 'react';
import { useParams } from 'react-router';
import UserDetail from '../../components/UserDetail/UserDetail';

const UserPage = () => {
  const { username } = useParams();
  return (
    <>
      <div className='row'>
        <UserDetail />
      </div>
    </>
  );
};

export default UserPage;
