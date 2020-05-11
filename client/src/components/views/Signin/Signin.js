import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../layout/Layout/Layout';

class Signin extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    userRedirect: false,
  };

  authenticateUser = data => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data));
    }
  };

  onChange = e => {
    const { formData } = this.state;
    //assign form data to new variable
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    this.setState({
      formData: newFormData,
    });
  };

  signIn = user => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post('http://localhost:8000/api/signin', user, config)
      .then(res => this.authenticateUser(res.data));
    this.setState({
      formData: { email: '', password: '' },
      userRedirect: true,
    });
  };

  onSubmit = e => {
    const { password, email } = this.state.formData;
    e.preventDefault();
    this.signIn({ email, password });
  };

  signInForm = (email, password) => (
    <form onSubmit={this.onSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={this.onChange}
          className='form-control'
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          name='password'
          minLength='6'
          value={password}
          onChange={this.onChange}
          className='form-control'
        ></input>
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );

  redirecUser = () => {
    const { userRedirect } = this.state;

    if (userRedirect === true) {
      return <Redirect to='/' />;
    }
  };

  render() {
    const { email, password } = this.state.formData;
    return (
      <Layout
        title='Signin'
        description='Login to your account'
        className='container col-md-8 offset-md-2'
      >
        {this.signInForm(email, password)}
        {this.redirecUser()}
      </Layout>
    );
  }
}

export default Signin;
