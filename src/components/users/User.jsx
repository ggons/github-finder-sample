import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = ({ user, repos, loading, match, getUser, getUserRepos }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const { 
    name, 
    avatar_url, 
    location, 
    bio, 
    blog, 
    login, 
    html_url, 
    company,
    followers, 
    following, 
    public_repos, 
    public_gists, 
    hireable 
  } = user;

  if (loading) return <Spinner />;

  return (  
    <>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable: {' '}
      {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong> {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Blog: </strong> {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>

      <Repos 
        repos={repos}
      />
    </>
  );
}

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
}
 
export default User;