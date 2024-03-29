import React from 'react';
import { Link } from 'react-router-dom';

import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/Layout/Layout';

const UserDashboard = () => {
  const {
    payload: {
      user: { name, email, role },
    },
  } = isAuthUser();

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/cart' className='nav-link'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/profile/update' className='nav-link'>
              Profile Update
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  const userHistory = () => {
    return (
      <div className='card'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>History</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='User Dashboard'
      description={`Wlecome ${name}`}
      className='container col-md-8 offset-md-2'
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {userHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
