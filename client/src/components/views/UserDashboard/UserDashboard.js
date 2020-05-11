import React from 'react';
import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/Layout/Layout';

const UserDashboard = () => {
  const {
    payload: {
      user: { name, email, role },
    },
  } = isAuthUser();

  return (
    <Layout
      title='User Dashboard'
      description={`Wlecome ${name}`}
      className='container col-md-8 offset-md-2'
    >
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
      <div className='card'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>History</li>
        </ul>
      </div>
    </Layout>
  );
};

export default UserDashboard;
