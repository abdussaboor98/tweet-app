import React from 'react';
import SideBar from '../../components/Layout/SideBar/SideBar';
import HomeFeed from '../../components/HomeFeed/HomeFeed';

const HomePage = () => {
  return (
    <div className='row'>
      <section className='col-md-3 home-page__sidebar d-md-block d-none'>
        <SideBar></SideBar>
      </section>
      <div className='col-md-9'>
        <HomeFeed />
      </div>
    </div>
  );
};

export default HomePage;
