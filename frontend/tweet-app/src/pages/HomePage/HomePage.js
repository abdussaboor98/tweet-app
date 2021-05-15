import React from 'react';
import SideBar from '../../components/Layout/SideBar/SideBar';
import Feed from '../../components/Feed/Feed';

const HomePage = () => {
  return (
    <div className='row'>
      <section className='col-md-3 home-page__sidebar d-md-block d-none'>
        <SideBar></SideBar>
      </section>
      <div className='col-md-9'>
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
