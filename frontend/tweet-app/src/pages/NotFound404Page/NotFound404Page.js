import React from 'react';
import Lottie from 'react-lottie';
import animationJson from '../../assets/lotties/404.json';

const NotFound404Page = () => {
  return (
    <div>
      <div className='d-flex flex-column justify-content-evenly w-100 text-center'>
        <h1 className='fs-2 mt-5'>Oops! Looks like you lost.</h1>
        <div className='w-50 mx-auto'>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationJson,
            }}
          />
        </div>
        <div className='mx-auto mt-5'>
          <button className='btn btn-primary'>Go to Home</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound404Page;
