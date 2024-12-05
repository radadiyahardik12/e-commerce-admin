import { useEffect, useState } from 'react';
import './App.css';
import Categories from './components/Categories';
import Products from './components/ProductList';
import Start from './Start';
import Auth from './Auth';

function App() {
  const [isAuth, setisAuth] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('Auth')) {
      setisAuth(true);
    }
  }, [JSON.stringify(localStorage.getItem('Auth'))])
console.log("isAuth", isAuth)
  return (
    <div>
      {isAuth ? 
      <Start/>
      :
      <Auth setisAuth={setisAuth}/>
      }
    </div>
  );
}
  

export default App;
