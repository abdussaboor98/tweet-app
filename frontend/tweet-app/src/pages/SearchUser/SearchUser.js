import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Layout/Loader';
import UserDetail from '../../components/UserDetail/UserDetail';
import { UserContext } from '../../context/user-context';
import { searchUsersDetailsApi } from '../../services/api-service';

const SearchUser = () => {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [partialUsername, setPartialUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUser();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [partialUsername]);

  const searchUser = () => {
    if (partialUsername && partialUsername !== '') {
      setIsLoading(true);
      searchUsersDetailsApi(partialUsername, token).then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
          setIsLoading(false);
        }
      });
    } else {
      setUsers([]);
    }
  };

  const handleOnChange = (e) => {
    setPartialUsername(e.target.value);
  };
  return (
    <div>
      <h1 className='w-100 text-center mt-5'>Search User</h1>
      <div className='my-5 mx-auto w-75'>
        <input
          type='text'
          className='form-control'
          onChange={handleOnChange}
          value={partialUsername}
          placeholder='Serach for user'
        />
      </div>
      {isLoading ? (
        <Loader size='2rem' />
      ) : (
        users.map((user) => <UserDetail user={user} />)
      )}
    </div>
  );
};

export default SearchUser;
