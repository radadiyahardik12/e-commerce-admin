const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image : { type: String, required: true},
    is_sub : { type: Boolean},
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  });

module.exports = mongoose.model('Category', CategorySchema);
