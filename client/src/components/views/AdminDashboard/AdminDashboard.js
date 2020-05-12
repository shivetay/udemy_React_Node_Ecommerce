import React from 'react';
import { Link } from 'react-router-dom';

import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/Layout/Layout';

const AdminDashboard = () => {
  const {
    payload: {
      user: { name, email, role },
    },
  } = isAuthUser();

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/create/category' className='nav-link'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/create/product' className='nav-link'>
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
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

  return (
    <Layout
      title='User Dashboard'
      description={`Wlecome ${name}`}
      className='container col-md-8 offset-md-2'
    >
      <div className='row'>
        <div className='col-3'>{adminLinks()}</div>
        <div className='col-9'>{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
