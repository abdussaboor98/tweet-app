import React, { useState } from 'react';
import { login } from '../../services/auth-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(username, password)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        setUsername('');
        setPassword('');
      });
  };

  return (
    <form>
      <div className='mt-3'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <input
          className='form-control'
          type='text'
          placeholder='Enter username...'
          id='username'
          disabled={isLoading}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className='mt-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          className='form-control'
          type='password'
          placeholder='Enter password...'
          id='password'
          value={password}
          disabled={isLoading}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className='d-grid gap-2'>
        <button
          className='btn btn-primary btn-block mb-2 mt-4'
          type='submit'
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
          ) : (
            'Login'
          )}
        </button>
      </div>
    </form>
  );
};

export default Login;
