import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import logo from '../../assets/logo.png';

const NavigationBar = () => {
  const { logout, loggedInUser } = useContext(UserContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark w-100'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img src={logo} alt='Tweet App' className='app_logo' />
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
                <NavLink
                  className='nav-link'
                  to='/'
                  exact
                  activeClassName='active'
                >
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  exact
                  to={'/users/' + loggedInUser}
                  activeClassName='active'
                >
                  My Tweets
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  exact
                  to='/users'
                  activeClassName='active'
                >
                  All Users
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  to='/search'
                  exact
                  activeClassName='active'
                >
                  Search User
                </NavLink>
              </li>
            </ul>
            {/* <li className='nav-item ms-auto'> */}
            <button
              className='btn btn-outline-secondary me-3'
              onClick={handleLogout}
            >
              Logout
            </button>
            {/* </li> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
