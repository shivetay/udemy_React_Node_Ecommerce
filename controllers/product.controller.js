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
    let product = new Product(fields);

    //name 'photo' mus match client side. use photo
    if (files.photo) {
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
