import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/Layout/Layout';

class CreateProduct extends Component {
  state = {
    product: {
      name: '',
      decription: '',
      price: '',
      categories: [],
      category: '',
      shipping: '',
      quantity: '',
      photo: '',
    },
  };

  changeForm = e => {
    const { product } = this.state;
    //assign form data to new variable
    let newProduct = { ...product };
    newProduct[e.target.name] = e.target.value;
    this.setState({
      product: newProduct,
    });
  };

  onSubmit = e => {
    const {
      name,
      description,
      price,
      categories,
      category,
      shipping,
      quantity,
    } = this.state.product;
    e.preventDefault();
    this.createProduct({
      name,
      description,
      price,
      categories,
      category,
      shipping,
      quantity,
    });
  };

  createProduct = product => {
    const { token } = isAuthUser();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`http://localhost:8000/api/product/create/`, product, config)
      .then(res => res.data);
    // this.setState({
    //   product: { name: '' },
    // });
  };

  newProdyctForm = (
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity
  ) => (
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
      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <input
          type='text'
          name='description'
          value={description}
          className='form-cotrol'
          onChange={this.changeForm}
          autoFocus
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          type='text'
          name='price'
          value={price}
          className='form-cotrol'
          onChange={this.changeForm}
          autoFocus
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <input
          type='text'
          name='shipping'
          value={shipping}
          className='form-cotrol'
          onChange={this.changeForm}
          autoFocus
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Puantity</label>
        <input
          type='text'
          name='quantity'
          value={quantity}
          className='form-cotrol'
          onChange={this.changeForm}
          autoFocus
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Photo</label>
        <input
          type='file'
          name='photo'
          // value={name}
          accept='image/*'
          className='form-cotrol'
          onChange={this.changeForm}
          autoFocus
        />
      </div>
      <button className='btn btn-outline-primary'>Create</button>
    </form>
  );

  render() {
    const { name } = this.state.product;

    return (
      <Layout
        title='Create Product'
        description={'Wlecome'}
        className='container col-md-8 offset-md-2'
      >
        <h2>Create Product</h2>
        {this.newProdyctForm(name)}
      </Layout>
    );
  }
}

export default CreateProduct;
