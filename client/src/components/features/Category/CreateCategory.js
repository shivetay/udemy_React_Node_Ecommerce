import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/Layout/Layout';

class CreateCategory extends Component {
  state = {
    category: {
      name: '',
    },
  };

  changeForm = e => {
    const { category } = this.state;
    //assign form data to new variable
    let newCategory = { ...category };
    newCategory[e.target.name] = e.target.value;
    this.setState({
      category: newCategory,
    });
  };

  onSubmit = e => {
    const { name } = this.state.category;
    e.preventDefault();
    this.createCategory({ name });
  };

  createCategory = category => {
    const { token } = isAuthUser();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`http://localhost:8000/api/category/create/`, category, config)
      .then(res => res.data);
    this.setState({
      category: { name: '' },
    });
  };

  newCategoryForm = name => (
    <form onSubmit={this.onSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          className='form-cotrol'
          onChange={this.changeForm}
          autoFocus
        />
      </div>
      <button className='btn btn-outline-primary'>Create</button>
    </form>
  );

  render() {
    const { name } = this.state.category;

    return (
      <Layout
        title='Create Category'
        description={'Wlecome'}
        className='container col-md-8 offset-md-2'
      >
        <h2>Create category</h2>
        {this.newCategoryForm(name)}
      </Layout>
    );
  }
}

export default CreateCategory;
