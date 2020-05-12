import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Signup from './components/views/Signup/Signup';
import Signin from './components/views/Signin/Signin';
import Home from './components/views/Home/Home';
import PrivateRoute from './components/common/ProvateRoute/PrivateRoute';
import AdminRoute from './components/common/ProvateRoute/AdminRoute';
import UserDashboard from './components/views/UserDashboard/UserDashboard';
import AdminDashboard from './components/views/AdminDashboard/AdminDashboard';
import CreateCategory from './components/features/Category/CreateCategory';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/create/category' component={CreateCategory} />
          <PrivateRoute exact path='/user/dashboard' component={UserDashboard} />
          <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
