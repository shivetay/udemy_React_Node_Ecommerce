const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product.model');

/* find product by id */
exports.findProductById = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Product not found',
          },
        ],
      });
    }
    req.product = product;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* getn single product (read) */
exports.getProduct = async (req, res) => {
  try {
    req.product.photo = undefined;
    return res.json(req.product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* create product */
//TODO: change to async
exports.createProduct = (req, res) => {
  //form data is avalible from new formidable.incoming form
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Image could not be uploaded' }] });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'All fields are requierd' }] });
    }
    let product = new Product(fields);

    //1kb = 1000
    //1mb = 1000000kb
    //name 'photo' mus match client side. use photo
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          errors: [{ msg: 'Image could not be uploaded. File to big.' }],
        });
      }
      //this relates to data in schema product
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Photo was not uploaded' }] });
      }
      res.json(result);
    });
  });
};

/* delete product */
exports.removeProduct = async (req, res) => {
  try {
    let product = req.product;

    if (!product) {
      return res.status(400).json({ errors: [{ msg: 'Product not found' }] });
    }
    await product.remove();
    return res.json('Product removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* update product */
exports.updateProduct = async (req, res) => {
  try {
    //form data is avalible from new formidable.incoming form
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Image could not be uploaded',
            },
          ],
        });
      }
      // check for all fields
      const { name, description, price, category, quantity, shipping } = fields;

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          errors: [
            {
              msg: 'All fields are requierd',
            },
          ],
        });
      }
      let product = req.product; //update product. this is from findprtoductbyid
      //this is from loadhas
      product = _.extend(product, fields);

      //1kb = 1000
      //1mb = 1000000kb
      //name 'photo' mus match client side. use photo
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            errors: [
              {
                msg: 'Image could not be uploaded. File to big.',
              },
            ],
          });
        }
        //this relates to data in schema product
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            errors: [
              {
                msg: 'Photo was not uploaded',
              },
            ],
          });
        }
        res.json(result);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* 
sell / arrival 
* by sell = /products?sortBy=sold&order=desc&limit=
* by arrival = /products?sortBy=createdAt&order=desc&limit=

* if no params - all return
*/

/* get all products */
exports.list = (req, res) => {
  // try {
  //query will get link
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? req.query.limit : 6;

  Product.find()
    .select('-photo') //this will not get photo
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Products not found',
            },
          ],
        });
      }
      res.json(products);
    });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server error');
  // }
};

/* related products
it will find products based on product category
*/

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Products not found',
            },
          ],
        });
      }
      res.json(products);
    });
};

exports.listAllCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Products not found',
          },
        ],
      });
    }
    res.json(categories);
  });
};

/* search products */
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};
