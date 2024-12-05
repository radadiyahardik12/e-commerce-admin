import { useEffect, useState } from 'react';
import './App.css';
import Categories from './components/Categories';
import Products from './components/ProductList';

function Start() {
  const [categories, setCategories] = useState([]);
  const [selectSubCategoryId, setselectSubCategoryId] = useState(0);


  const fetchCategories = async () => {
    const response = await fetch('http://localhost:5000/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    setCategories(data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
console.log("123");

  return (
    <div className="app">
      <h1 className="app-header">E-Commerce Admin Panel</h1>
      <div className="container">
        <Categories fetchCategories={fetchCategories} categories={categories} setselectSubCategoryId={setselectSubCategoryId} />
        <Products categories={categories} selectSubCategoryId={selectSubCategoryId} />
      </div>
    </div>
  );
}

export default Start;
