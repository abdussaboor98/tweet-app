import React, { useContext, useEffect, useState } from 'react';
import profile from '../../../assets/profile.png';
import { UserContext } from '../../../context/user-context';
import { fetchUserDetailApi } from '../../../services/api-service';
import Loader from '../Loader';
import './SideBar.css';

const SideBar = () => {
  const { loggedInUser, token } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUserDetailApi(loggedInUser, token).then((res) => {
      setUser(res.data);
      setIsLoading(false);
    });
  }, [loggedInUser, token]);

  return (
    <div className='w-100 pt-5 pe-3 h-100 sidebar'>
      {isLoading ? (
        <Loader size='2rem'></Loader>
      ) : (
        <>
          <div className='sidebar__profile'>
            <img
              className='w-100 rounded-circle img-thumbnail'
              src={profile}
              alt='Profile'
            />
          </div>
          <h3 className='sidebar__details w-100 text-center'>
            {user.firstName + ' ' + user.lastName}
          </h3>
          <p className='w-100 text-center'>@{loggedInUser}</p>
        </>
      )}
    </div>
  );
};

export default SideBar;
