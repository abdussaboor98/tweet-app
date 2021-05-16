import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import { UserContext } from './context/user-context';
import NavigationBar from './components/Layout/NavigationBar';
import UserPage from './pages/UserPage/UserPage';
import AllUsers from './pages/AllUsers/AllUsers';
import SearchUser from './pages/SearchUser/SearchUser';

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
          <Route path='/users/:username' exact component={UserPage} />
          <Route path='/users' exact component={AllUsers} />
          <Route path='/search' exact component={SearchUser} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
