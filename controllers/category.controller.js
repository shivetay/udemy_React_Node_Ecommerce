const Category = require('../models/category.model');

/* get category by id */

exports.categoryById = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    console.log('category', category);
    if (!category) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Category not found',
          },
        ],
      });
    }
    req.category = category;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* create category */
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

/* get one category (read) */
exports.readCategory = (req, res) => {
  return res.json(req.category);
};

/* delete category */

exports.deleteCategory = async (req, res) => {
  try {
    let category = req.category;

    if (!category) {
      return res.status(400).json({ errors: [{ msg: 'Category not found' }] });
    }
    await category.remove();
    return res.json('Category removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/*udpate category post */
exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    category = await req.category; //update categore if exists
    category.name = name;
    await category.save();
    return res.json({ category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* get all categories */
exports.getAllCategories = async (req, res) => {
  try {
    await Category.find().exec((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'No categories found' }] });
      }
      res.json(data);
    });
  } catch (err) {}
};
