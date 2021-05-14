import React from 'react';
import SideBar from '../components/Layout/SideBar/SideBar';
import TweetList from '../components/TweetList/TweetList';
import TweetEditor from '../components/TweetEditor/TweetEditor';

const HomePage = () => {
  return (
    <div className='row'>
      <section className='col-md-3 home-page__sidebar d-md-block d-none'>
        <SideBar></SideBar>
      </section>
      <div className='col-md-9'>
        <div className='row'>
          <TweetEditor></TweetEditor>
        </div>
        <div className='row'>
          <TweetList></TweetList>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
