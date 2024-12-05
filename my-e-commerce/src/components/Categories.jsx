import React, { useState } from 'react';

const Categories = ({ fetchCategories, categories = [], setselectSubCategoryId }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [parentId, setParentId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const [selectMainCategoryId, setselectMainCategoryId] = useState(0);

  const saveCategory = async () => {
   const is_sub = parentId ? true : false; 
    await fetch('http://localhost:5000/api/category/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, image, parentId, categoryId, is_sub }),
    });
    setOpenCategory(!openCategory)
    setName('');
    setImage('');
    setParentId('');
    setCategoryId('');
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await fetch('http://localhost:5000/api/category/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId: id }),
    });
    fetchCategories();
  };

  const handleEdit = (category) => {
    setName(category.name);
    setImage(category.image);
    const datacate = categories && categories.length > 0 &&  categories.find((pa) => pa._id == parentId) ? categories.find((pa) => pa._id == parentId)._id : ''
    console.log(category ,category._id, datacate);
    
    setParentId(category._id || '');
    setCategoryId(category._id);
  };
  return (
    <div className="categories">
      <div className='category'>
        <h2>Manage Categories</h2>
        <button onClick={() => setOpenCategory(!openCategory)}>Add Categories</button>

      </div>
      {openCategory ? 
      <div className="form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">No Parent</option>
          {categories.filter((fi) => fi.is_sub === false).map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={saveCategory}>{categoryId ? 'Update' : 'Add'} Category</button>
      </div>
      : <></>}
      <ul className="list">
        {categories.filter((fil) => fil.is_sub === false).map((cat) => (
          <li key={cat._id}>
            <div onClick={() => setselectMainCategoryId(cat._id)}>
              <img src={cat.image} alt={cat.image} width={200} height={200} />
              <div className='category'>
                <div>
                  {cat.name}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => {
                    handleEdit(cat);
                    setOpenCategory(true)
                  }}
                  >Edit</button>
                  <button onClick={() => deleteCategory(cat._id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {!selectMainCategoryId ? <></> : <h2>Sub Categories</h2>}
      {!selectMainCategoryId ? <></> :
      <ul className="list">
      {selectMainCategoryId && categories.filter((fil) =>fil._id == selectMainCategoryId)[0].subcategories.map((cat) => (
          <li key={cat._id}>
            <div onClick={() => setselectSubCategoryId(cat._id)}>
              <img src={cat.image} alt={cat.image} width={200} height={200} />
              <div className='category'>
                <div>
                  {cat.name}
                </div>
                <div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(cat);
                    setOpenCategory(true)
                  }}
                  >Edit</button>
                  <button onClick={() => deleteCategory(cat._id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default Categories;
