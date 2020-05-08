import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../../layout/Layout/Layout';

class Signup extends Component {
  state = {
    formData: {
      name: '',
      email: '',
      password: '',
    },
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

  signUp = user => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('http://localhost:8000/api/signup', user, config).then(res => res.data);
  };

  onSubmit = e => {
    const { password, name, email } = this.state.formData;
    e.preventDefault();
    this.signUp({ name, email, password });
  };

  signUpForm = (name, email, password) => (
    <form onSubmit={this.onSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={this.onChange}
          className='form-control'
        ></input>
      </div>
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
  render() {
    const { name, email, password } = this.state.formData;
    return (
      <Layout title='Signup' description='' className='container col-md-8 offset-md-2'>
        {this.signUpForm(name, email, password)}
      </Layout>
    );
  }
}

export default Signup;
