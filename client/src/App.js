import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Signup from './components/views/Signup/Signup';
import Signin from './components/views/Signin/Signin';
import Home from './components/views/Home/Home';
import PrivateRoute from './components/common/ProvateRoute/PrivateRoute';
import UserDashboard from './components/views/UserDashboard/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <PrivateRoute exact path='/dashboard' component={UserDashboard} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
