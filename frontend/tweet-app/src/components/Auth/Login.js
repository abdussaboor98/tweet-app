import React, { useState, useContext } from 'react';
import { login } from '../../services/api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/user-context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isInvalidUser, setIsInvalidUser] = useState(false);

  const { setLoggedInUser, setToken } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsFormValidated(true);
    if (e.target.checkValidity()) {
      setIsInvalidUser(false);
      setIsLoading(true);
      login(username, password)
        .then((res) => {
          // Successful login
          setUsername('');
          setPassword('');
          setToken(res.data.token);
          setLoggedInUser(res.data.username);
        })
        .catch((err) => {
          // Unsuccessful login
          setIsInvalidUser(true);
          setIsFormValidated(false);
          setIsLoading(false);
        });
    }
  };

  return (
    <form
      className={isFormValidated ? 'was-validated' : undefined}
      noValidate
      onSubmit={handleLogin}
    >
      {isInvalidUser && (
        <div className='alert alert-danger text-center fade show' role='alert'>
          Incorrect username or password.
        </div>
      )}
      <div className='mt-3'>
        <label htmlFor='username' className='form-label'>
          Username<span style={{ color: 'red' }}>*</span>
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
          required
          autoFocus
        />
        <div className='invalid-feedback'>Please enter the username.</div>
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
          value={password}
          disabled={isLoading}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <div className='invalid-feedback'>Please enter the password.</div>
      </div>
      <div className='d-grid gap-2'>
        <button
          className='btn btn-primary btn-block mb-2 mt-4'
          type='submit'
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
