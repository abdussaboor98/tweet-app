import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  validateEmail,
  validatePasswordStrength,
  validatePhoneNo,
  validateRequired,
} from '../../utils';
import { register } from '../../services/api-service';

const Register = ({ setAuthOption, setIsRegistered }) => {
  const initialUserValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
  };

  const initialErrorsValue = {
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
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [errors, setErrors] = useState(initialErrorsValue);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setIsFormValidated(true);
    if (validateInput()) {
      setIsLoading(true);
      register(user)
        .then((res) => {
          if (res.status === 201) {
            setErrors(initialErrorsValue);
            setUser(initialErrorsValue);
            setIsLoading(false);
            setIsRegistered(true);
            setAuthOption('login');
          }
        })
        .catch((err) => {
          if (err.response) {
            const message = err.response.data.message;
            console.log(message);
            if (message.includes('username is already in use')) {
              setErrors((prevErrors) => {
                return {
                  ...prevErrors,
                  username: 'This username is already in use.',
                };
              });
            } else if (message.includes('email is already in use')) {
              setErrors((prevErrors) => {
                return {
                  ...prevErrors,
                  email: 'This email is already registered.',
                };
              });
            }
          }
          setIsLoading(false);
        });
    }
  };

  const validateInput = () => {
    let allValid = true;
    for (let key in user) {
      if (key !== 'lastName' && !validateRequired(user[key])) {
        allValid = false;
        setErrors((prevErrors) => {
          return { ...prevErrors, [key]: 'This field cannot be empty.' };
        });
      }
    }

    if (!validateEmail(user.email) && errors.email === '') {
      allValid = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, email: 'Enter a valid email.' };
      });
    }

    const passwordErrors = validatePasswordStrength(user.password);
    if (passwordErrors.length > 0 && errors.password === '') {
      allValid = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: passwordErrors,
        };
      });
    }

    if (
      user.password !== user.confirmPassword &&
      errors.confirmPassword === ''
    ) {
      allValid = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          confirmPassword: 'The passwords do not match',
        };
      });
    }

    if (!validatePhoneNo(user.phoneNo) && errors.phoneNo === '') {
      allValid = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          phoneNo: 'Enter a proper phone number.',
        };
      });
    }

    return allValid;
  };

  const handleOnChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
    setErrors((prevErrors) => {
      return { ...prevErrors, [e.target.name]: '' };
    });
  };

  return (
    <form onSubmit={onFormSubmit} className={null} noValidate>
      <div className='mt-3'>
        <label htmlFor='username' className='form-label'>
          Username<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.username !== '' ? 'is-invalid' : ''
          }`}
          type='text'
          placeholder='Enter username...'
          id='username'
          value={user.username}
          name='username'
          onChange={handleOnChange}
          disabled={isLoading}
          autoFocus
        />
        <div className='invalid-feedback'>{errors.username}</div>
      </div>
      <div className='mt-3'>
        <label htmlFor='email' className='form-label'>
          Email<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.email !== '' ? 'is-invalid' : ''
          }`}
          type='text'
          placeholder='Enter email...'
          id='email'
          value={user.email}
          name='email'
          onChange={handleOnChange}
          disabled={isLoading}
        />
        <div className='invalid-feedback'>{errors.email}</div>
      </div>
      <div className='mt-3'>
        <label htmlFor='password' className='form-label'>
          Password<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.password !== '' ? 'is-invalid' : ''
          }`}
          type='password'
          placeholder='Enter password...'
          id='password'
          value={user.password}
          name='password'
          onChange={handleOnChange}
          disabled={isLoading}
        />
        <div className='invalid-feedback'>
          {typeof errors.password === 'string'
            ? errors.password
            : errors.password.map((error, id) => (
                <label key={id}>{error}</label>
              ))}
        </div>
      </div>
      <div className='mt-3'>
        <label htmlFor='password' className='form-label'>
          Confirm Password<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.confirmPassword !== '' ? 'is-invalid' : ''
          }`}
          type='password'
          placeholder='Enter password...'
          id='confirm-password'
          value={user.confirmPassword}
          name='confirmPassword'
          onChange={handleOnChange}
          disabled={isLoading}
        />
        <div className='invalid-feedback'>{errors.confirmPassword}</div>
      </div>
      <div className='mt-3'>
        <label htmlFor='first_name' className='form-label'>
          First Name<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.firstName !== '' ? 'is-invalid' : ''
          }`}
          type='text'
          placeholder='Enter your first name...'
          id='first_name'
          value={user.firstName}
          name='firstName'
          onChange={handleOnChange}
          disabled={isLoading}
        />
        <div className='invalid-feedback'>{errors.firstName}</div>
      </div>
      <div className='mt-3'>
        <label htmlFor='last_name' className='form-label'>
          Last Name
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.lastName !== '' ? 'is-invalid' : ''
          }`}
          type='text'
          placeholder='Enter your last name...'
          id='last_name'
          value={user.lastName}
          name='lastName'
          onChange={handleOnChange}
          disabled={isLoading}
        />
        <div className='invalid-feedback'>{errors.lastName}</div>
      </div>
      <div className='mt-3'>
        <label htmlFor='phno' className='form-label'>
          Phone Number<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`form-control ${
            isFormValidated && errors.phoneNo !== '' ? 'is-invalid' : ''
          }`}
          type='text'
          placeholder='Enter your phone number...'
          id='phno'
          value={user.phoneNo}
          name='phoneNo'
          onChange={(e) => {
            if (e.target.value === '' || validatePhoneNo(e.target.value))
              handleOnChange(e);
          }}
          disabled={isLoading}
        />
        <div className='invalid-feedback'>{errors.phoneNo}</div>
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
            'Register'
          )}
        </button>
      </div>
    </form>
  );
};

export default Register;
