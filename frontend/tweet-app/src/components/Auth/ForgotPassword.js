import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { updateForgotPassword } from '../../services/api-service';
import { validatePasswordStrength, validateRequired } from '../../utils';

const ForgotPassword = ({ modalToggle }) => {
  const initialUserValue = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const initialErrorsValue = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [user, setUser] = useState(initialUserValue);
  const [errors, setErrors] = useState(initialErrorsValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isPasswordChanges, setIsPasswordChanged] = useState(false);

  const handleOnChangePassword = (e) => {
    e.preventDefault();
    console.log(user);
    setIsFormValidated(true);

    if (validateInput()) {
      setIsLoading(true);
      updateForgotPassword(user.username, user.password)
        .then((res) => {
          if (res.status === 200) {
            setErrors(initialErrorsValue);
            setUser(initialErrorsValue);
            setIsLoading(false);
            setIsPasswordChanged(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const validateInput = () => {
    let allValid = true;
    for (let key in user) {
      if (!validateRequired(user[key])) {
        allValid = false;
        setErrors((prevErrors) => {
          return { ...prevErrors, [key]: 'This field cannot be empty.' };
        });
      }
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
    <div className='modal fade' id='forgotPasswordModal' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Forgot Password
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
            ></button>
          </div>
          <div className='modal-body'>
            {isPasswordChanges && (
              <div className='alert alert-success' role='alert'>
                If the user exists then the password will be changed. Login
                using the new password
              </div>
            )}
            <form>
              <div className='mt-3'>
                <label htmlFor='username-fp' className='form-label'>
                  Username<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  className={`form-control ${
                    isFormValidated && errors.username !== ''
                      ? 'is-invalid'
                      : ''
                  }`}
                  type='text'
                  placeholder='Enter username...'
                  id='username-fp'
                  value={user.username}
                  name='username'
                  onChange={handleOnChange}
                  disabled={isLoading}
                  autoFocus
                />
                <div className='invalid-feedback'>{errors.username}</div>
              </div>
              <div className='mt-3'>
                <label htmlFor='password-fp' className='form-label'>
                  New Password<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  className={`form-control ${
                    isFormValidated && errors.password !== ''
                      ? 'is-invalid'
                      : ''
                  }`}
                  type='password'
                  placeholder='Enter new password...'
                  id='password-fp'
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
                <label htmlFor='confirm-password-fp' className='form-label'>
                  Confirm Password<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  className={`form-control ${
                    isFormValidated && errors.confirmPassword !== ''
                      ? 'is-invalid'
                      : ''
                  }`}
                  type='password'
                  placeholder='Confirm password...'
                  id='confirm-password-fp'
                  value={user.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  disabled={isLoading}
                />
                <div className='invalid-feedback'>{errors.confirmPassword}</div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleOnChangePassword}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
