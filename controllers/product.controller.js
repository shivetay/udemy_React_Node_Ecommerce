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

// exports.updateProduct = async (req, res) =>{
//   try{

//   }catch(err){
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// }

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
