import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user-context';

const NavigationBar = () => {
  const { setLoggedInUser, setToken, loggedInUser } = useContext(UserContext);
  const handleLogout = () => {
    setToken(null);
    setLoggedInUser(null);
  };
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Tweet App
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbar'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbar'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'/users/' + loggedInUser}>
                  My Tweets
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/users'>
                  All Users
                </Link>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
