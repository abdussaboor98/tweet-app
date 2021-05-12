import React, { useState } from 'react';

const Register = () => {
  const initialUserValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
  };

  const [user, setUser] = useState(initialUserValue);
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='mt-3'>
        <label htmlFor='username' className='form-label'>
          Username<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className='form-control'
          type='text'
          placeholder='Enter username...'
          id='username'
          value={user.username}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, username: e.target.value };
            });
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='email' className='form-label'>
          Email<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className='form-control'
          type='text'
          placeholder='Enter email...'
          id='email'
          value={user.email}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, email: e.target.value };
            });
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='password' className='form-label'>
          Password<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className='form-control'
          type='password'
          placeholder='Enter password...'
          id='password'
          value={user.password}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, password: e.target.value };
            });
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='password' className='form-label'>
          Confirm Password<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className='form-control'
          type='password'
          placeholder='Enter password...'
          id='password'
          value={user.confirmPassword}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, confirmPassword: e.target.value };
            });
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='first_name' className='form-label'>
          First Name<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className='form-control'
          type='text'
          placeholder='Enter your first name...'
          id='first_name'
          value={user.firstName}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, firstName: e.target.value };
            });
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='last_name' className='form-label'>
          Last Name
        </label>
        <input
          className='form-control'
          type='text'
          placeholder='Enter your last name...'
          id='last_name'
          value={user.lastName}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, lastName: e.target.value };
            });
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='phno' className='form-label'>
          Phone Number<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className='form-control'
          type='text'
          placeholder='Enter your phone number...'
          id='phno'
          value={user.phoneNo}
          onChange={(e) => {
            setUser((prevUser) => {
              return { ...prevUser, phoneNo: e.target.value };
            });
          }}
        />
      </div>
      <div className='d-grid gap-2'>
        <button className='btn btn-block btn-primary mb-2 mt-4' type='submit'>
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
