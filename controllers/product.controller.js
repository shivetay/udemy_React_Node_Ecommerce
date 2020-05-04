const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product.model');

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
