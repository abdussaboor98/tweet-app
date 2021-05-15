import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Layout/Loader';
import UserDetail from '../../components/UserDetail/UserDetail';
import { UserContext } from '../../context/user-context';
import { fetchAllUsersDetailsApi } from '../../services/api-service';

const AllUsers = () => {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllUsersDetailsApi(token).then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div>
      <h1 className='w-100 text-center mt-5'>All Users</h1>
      {isLoading ? (
        <Loader size='2rem' />
      ) : (
        users.map((user) => <UserDetail user={user} />)
      )}
    </div>
  );
};

export default AllUsers;
