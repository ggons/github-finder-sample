import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setLoading(false);
    setUsers(res.data.items);
  }

  // Get single Github user
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setLoading(false);
    setUser(res.data);
  }

  // Get user repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setLoading(false);
    setRepos(res.data);
  }

  // Clear users from state
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  }

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }


  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/" render={props => (
              <>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0} 
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users} />    
              </>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User 
                {...props} 
                getUser={getUser} 
                getUserRepos={getUserRepos} 
                user={user} 
                repos={repos}
                loading={loading} 
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
