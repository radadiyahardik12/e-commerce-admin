const express = require('express');
const Category = require('../models/CategoryModal');

const router = express.Router();

router.post('/add', async (req, res) => {
  const { categoryId, name, image, parentId, is_sub } = req.body;

  try {
    let category;

    if (categoryId) {
      category = await Category.findByIdAndUpdate(
        categoryId,
        { name, image, is_sub },
        { new: true }
      );
      if (parentId) {
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
          return res.status(404).json({ error: 'Parent category not found' });
        }
        parentCategory.subcategories.push(category._id);
        await parentCategory.save();
      }
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    } else {
      category = new Category({ name, image, is_sub });

      if (parentId) {
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
          return res.status(404).json({ error: 'Parent category not found' });
        }
        parentCategory.subcategories.push(category._id);
        await parentCategory.save();
      }

      await category.save();
    }

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save category', details: error.message });
  }
});


router.post('/', async (req, res) => {
    try {
      const categories = await Category.find().populate('subcategories');
    res.status(201).json({ data : categories, message: 'Data found', status: 1 });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

router.post('/delete', async (req, res) => {
  const { categoryId } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (category.subcategories.length > 0) {
      await Category.updateMany(
        { subcategories: categoryId },
        { $pull: { subcategories: categoryId } }
      );
    }

    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
});

module.exports = router;