import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Loader = ({ size }) => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className='fa-spin w-100 my-3'
      style={{ fontSize: size, color: 'GrayText' }}
    />
  );
};

export default Loader;
