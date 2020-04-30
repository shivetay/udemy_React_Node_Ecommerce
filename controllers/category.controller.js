const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    // check if category is there
    let category = await Category.findOne({ name });
    if (category) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Category already exists' }] });
    }
    category = new Category(req.body); //save categore if not exists
    await category.save();
    return res.json({ category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
