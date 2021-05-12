import React, { useState } from 'react';
import './AuthForm.css';
import Login from './Login';
import Register from './Register';

const AuthForm = () => {
  const [authOption, setAuthOption] = useState('login');

  const authOptionValues = [
    { key: 1, name: 'Login', value: 'login' },
    { key: 2, name: 'Register', value: 'register' },
  ];

  const handleOnHandleChange = (e) => {
    e.preventDefault();
    setAuthOption(e.currentTarget.value);
  };
  return (
    <div className=' card mt-5 mx-auto auth-form__card'>
      <div className='card-body'>
        <div className='card-title text-center my-3'>
          <div className='btn-group'>
            {authOptionValues.map((authOptValue) => (
              <React.Fragment key={authOptValue.key}>
                <input
                  className='btn-check'
                  type='radio'
                  name='authoptionButtons'
                  id={'authOption_' + authOptValue.value}
                  value={authOptValue.value}
                  onChange={handleOnHandleChange}
                />
                <label
                  htmlFor={'authOption_' + authOptValue.value}
                  className={
                    authOption === authOptValue.value
                      ? 'btn btn-primary'
                      : 'btn btn-outline-secondary'
                  }
                >
                  {authOptValue.name}
                </label>
              </React.Fragment>
            ))}
          </div>
          <h4 className='mt-4'>
            {authOption === 'login'
              ? 'Login to your account'
              : 'Create your account'}
          </h4>
        </div>
        <div className='card-text'>
          {authOption === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
