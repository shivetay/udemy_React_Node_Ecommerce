import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Navigation = ({ history }) => {
  return (
    <nav>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/')} to='/'>
            Home
          </Link>
          <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>
            Signup
          </Link>
          <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>
            Signin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
