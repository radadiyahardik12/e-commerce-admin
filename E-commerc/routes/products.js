const express = require('express');
const Product = require('../models/ProductModal');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const Produ = await Product.find();
    res.status(201).json({data : Produ, message: 'Data found', status: 1 });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Produ' });
    }
  });

router.post('/add', async (req, res) => {
    const { productId, name, image, price, category } = req.body;
  
    try {
      let product;
  
      if (productId) {
        product = await Product.findByIdAndUpdate(
          productId,
          { name, image, price, category },
          { new: true }
        );
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
      } else {
        product = new Product({ name, image, price, category });
        await product.save();
      }
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save product', details: error.message });
    }
  });

router.post('/delete', async (req, res) => {
    const { productId } = req.body;
  
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product', details: error.message });
    }
  });
  

module.exports = router;