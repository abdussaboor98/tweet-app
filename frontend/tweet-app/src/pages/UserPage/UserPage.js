import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserDetail from '../../components/UserDetail/UserDetail';
import UserFeed from '../../components/UserFeed/UserFeed';
import { UserContext } from '../../context/user-context';
import { fetchUserDetailApi } from '../../services/api-service';

const UserPage = () => {
  const { username } = useParams();
  const { token } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUserDetailApi(username, token).then((res) => {
      setUser(res.data);
      setIsLoading(false);
    });
  }, [username]);
  return (
    <>
      <div className='row'>{isLoading || <UserDetail user={user} />}</div>
      <div className='row'>
        <UserFeed username={username} />
      </div>
    </>
  );
};

export default UserPage;
