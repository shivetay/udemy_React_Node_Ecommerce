import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Signup from './components/views/Signup/Signup';
import Signin from './components/views/Signin/Signin';

function App() {
  return (
    <BrowserRouter>
      <h1>App.js</h1>
      <MainLayout>
        <Switch>
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
