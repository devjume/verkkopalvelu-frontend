import './App.css';
import { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import axios from 'axios';
import Home from "./pages/Home";
import Category from './components/Category';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Discount from './pages/Discount';
import Details from './pages/Details';
import CarDetails from './pages/CarDetails';

import Order from './components/Order';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const URL = "http://localhost/verkkopalvelu-backend";

export default function App() {
    
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([])
  const [cart, setCart] = useState([]);
  
   useEffect(() => {

     axios.get(`${URL}/categories.php`)
       .then((response) => {
         setCategories(response.data);
         setIsLoaded(true);
       }).catch(error => {
         alert(error.response ? error.response.data.error : error)
       })

     if ('cart' in localStorage) {
       setCart(JSON.parse(localStorage.getItem('cart')));
     }
   }, [])

    function addToCart(product) {
      console.log(product)
      const newCart = [...cart,product]; 
      setCart(newCart);
      localStorage.setItem('cart',JSON.stringify(newCart));
    }

    function removeFromCart(product) {
      const itemsWithoutRemoved = cart.filter(item => item.tuote_id !== product.tuote_id);
      setCart(itemsWithoutRemoved);
      localStorage.setItem('cart',JSON.stringify(itemsWithoutRemoved));
    }


  return (
    <>
    { isLoaded && 
      <div className="container">
        <Navbar url={URL} categories={categories} cart={cart}/>
        <Routes>
          <Route path="/" element={<Home url={URL} addToCart={addToCart} />} ></Route>
          <Route path="/products" element={<Category url={URL} addToCart={addToCart} categoryId={0}/>}></Route>
          {categories?.map(category => (
            <Route path={category.nimi} key={category.id} element={<Category url={URL} addToCart={addToCart} categoryId={category.id}/>}></Route>
          ))}
          <Route path="/admin" element={<Admin url={URL} />}></Route>
          <Route path="/contact" element={<Contact url={URL} />}></Route>
          <Route path="/Order" element={<Order cart={cart} removeFromCart={removeFromCart} />} />
          
          <Route path="/discount" element={<Discount url={URL}/>}></Route>
          <Route path="/product/:id" element={<Details url={URL} />}></Route>
          <Route path="/product/carousel/:id" element={<CarDetails url={URL} addToCart={addToCart} />}></Route>
        </Routes>
        <Header></Header>
        <Footer />
      </div> }
    </>

  );
}

