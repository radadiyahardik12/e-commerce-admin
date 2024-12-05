import React, { useState, useEffect } from 'react';

const Products = ({ categories, selectSubCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [productId, setProductId] = useState('');
  const [openProduct, setOpenProduct] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [priceFilter, setPriceFilter] = useState({low : 0, high : 10000000})


  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    setProducts(data.data);
  };

  const saveProduct = async () => {
    await fetch('http://localhost:5000/api/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, image, price, category, productId }),
    });
    setOpenProduct(!openProduct)
    setName('');
    setImage('');
    setPrice('');
    setCategory('');
    setProductId('');
    fetchProducts();
  };

  // Delete Product
  const deleteProduct = async (id) => {
    await fetch('http://localhost:5000/api/products/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id }),
    });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setCategory(product.category?._id || '');
    setProductId(product._id);
  };

  const handleSort = (option) => {
    let sortedProducts = [...products];
    if (option === "nameAsc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "nameDesc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
    setSortOption(option);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products">
      <div className='category'>
        <h2>Manage Products</h2>
        <div style={{ display: 'flex',gap: '10px'}}>
          <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              style={{ marginBottom: "20px", padding: "10px" }}
            >
              <option value="">Sort By</option>
              <option value="nameAsc">Name (A to Z)</option>
              <option value="nameDesc">Name (Z to A)</option>
              <option value="priceLowHigh">Price (Low to High)</option>
              <option value="priceHighLow">Price (High to Low)</option>
            </select>
          <button onClick={() => setOpenProduct(!openProduct)}>Add Product</button>
        </div>
      </div>
      {openProduct ? 
      <div className="form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.filter((fi) => fi.is_sub === true).map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={saveProduct}>{productId ? 'Update' : 'Add'} Product</button>
      </div>
      :<></>}
      <div style={{display:'flex'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div>
            static Filters
          </div>
          <input
            type="number"
            placeholder="Price low"
            value={priceFilter.low}
            onChange={(e) => setPriceFilter({...priceFilter,  low :e.target.value})}
          />
          <input
            type="number"
            placeholder="Price high"
            value={priceFilter.high}
            onChange={(e) => setPriceFilter({...priceFilter, high :  e.target.value})}
          />
        </div>
        <ul className="list">
          {products.filter((item) => item.category == selectSubCategoryId  && priceFilter.low < Number(item.price) && priceFilter.high > Number(item.price)).map((prod) => (
            <li key={prod._id}>
            <div>
              <img src={prod.image} alt={prod.image} width={200} height={200} />
              <div className='category'>
                <div>
                  <div>
                    {prod.name}
                  </div>
                  <div>
                  $ {prod.price}
                  </div>
                </div>
                <div>
                  <button onClick={() => {
                    handleEdit(prod);
                    setOpenProduct(true)
                  }}
                  >Edit</button>
                  <button onClick={() => deleteProduct(prod._id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
