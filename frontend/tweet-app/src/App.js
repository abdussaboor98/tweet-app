import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AllUsersPage from './pages/AllUsersPage';
import UserDetailPage from './pages/UserDetailPage';
import { UserContext } from './context/user-context';

const App = () => {
  const { loggedInUser } = useContext(UserContext);

  if (!loggedInUser) {
    return <AuthPage />;
  }

  return (
    <main className='container-fluid'>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/users' exact component={AllUsersPage} />
          <Route path='/users/:username' exact component={UserDetailPage} />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
