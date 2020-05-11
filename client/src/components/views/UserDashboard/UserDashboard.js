import React, { Component } from 'react';

import Layout from '../../layout/Layout/Layout';

class UserDashboard extends Component {
  render() {
    return (
      <Layout
        title='User Dashboard'
        description='Wlecom User "name"'
        className='container col-md-8 offset-md-2'
      ></Layout>
    );
  }
}

export default UserDashboard;
