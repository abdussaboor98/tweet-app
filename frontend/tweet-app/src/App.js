import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AllUsersPage from './pages/AllUsersPage';
import UserDetailPage from './pages/UserDetailPage';
import { UserContext } from './context/user-context';
import NavigationBar from './components/Layout/NavigationBar';
import MyTweets from './pages/MyTweets';

const App = () => {
  const { loggedInUser } = useContext(UserContext);

  if (!loggedInUser) {
    return <AuthPage />;
  }

  return (
    <Router>
      <NavigationBar></NavigationBar>
      <main className='container-lg'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/users' exact component={AllUsersPage} />
          <Route path='/my-tweets' exact component={MyTweets} />
          <Route path='/users/:username' exact component={UserDetailPage} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
