import './App.css';
import { useState, useEffect } from 'react';
import {Routes, Route, createSearchParams} from "react-router-dom";
import axios from 'axios';
import Home from "./pages/Home";

import Admin from './pages/Admin';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Contact from './pages/Contact';
import Discount from './pages/Discount';


import Order from './components/Order';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from './components/Category';
import Product from './components/Product';
import ViewContact from './components/admin/ViewContact';
import NotFound from './pages/NotFound';

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

   //Callback function add product to cart.
    function addToCart(product) {
      if (cart.some(item => item.tuote_id === product.tuote_id)) {
        const existingProduct = cart.filter(item => item.tuote_id === product.tuote_id);
        updateAmount(parseInt(existingProduct[0].amount) +1,product);
      }
      else{
      product["amount"] = 1
      const newCart = [...cart,product]; 
      setCart(newCart);
      localStorage.setItem('cart',JSON.stringify(newCart));
    }
  }
     // Removing product from cart
    function removeFromCart(product) {
      const itemsWithoutRemoved = cart.filter(item => item.tuote_id !== product.tuote_id);
      setCart(itemsWithoutRemoved);
      localStorage.setItem('cart',JSON.stringify(itemsWithoutRemoved));
    }
    // Changing the amount in cart
    function updateAmount(amount, product) {
      product.amount = amount;
      const index = cart.findIndex((item => item.tuote_id === product.tuote_id));
      const modifiedCart = Object.assign([...cart],{[index]: product});
      setCart(modifiedCart);
      localStorage.setItem('cart', JSON.stringify(modifiedCart));
    }
  
    
  function empty() {
    localStorage.removeItem("cart");
    setCart([])
  }

  return (
    <div className='d-flex flex-column h-100'>
      {isLoaded && 
      <>
      <Navbar categories={categories} cart={cart} />
    
      <div className="container mb-5">
        <Routes>
          <Route path="*" element={<NotFound/>} ></Route>
          <Route path="/" element={<Home url={URL} addToCart={addToCart} categories={categories} />} ></Route>
          <Route path="/products" element={<Category url={URL} addToCart={addToCart} categoryId={0}/>}></Route>
          <Route path="/discount" element={<Category url={URL} addToCart={addToCart} fetchDiscount={true}/>}></Route>
          {categories?.map(category => (
            <Route path={`${category.nimi.replace(/\u00e4/g, "a").replace(/\u00f6/g, "o")}`} key={category.id} element={<Category url={URL} addToCart={addToCart} categoryId={category.id} categories={categories}/>}></Route>
          ))}
          <Route path="/admin" element={<Admin url={URL} />}></Route>
          <Route path="/admin/orders" element={<Orders url={URL} />}></Route>
          <Route path="/admin/orders/:id" element={<OrderDetails url={URL} />}></Route>
          <Route path="/contact" element={<Contact url={URL} />}></Route>
          <Route path="/admin/viewcontact" element={<ViewContact url={URL} />}></Route>
          <Route path="/admin/viewcontact/:id" element={<ViewContact url={URL} />}></Route>
          <Route path="/Order" 
            element={<Order 
              cart={cart} 
              removeFromCart={removeFromCart} 
              updateAmount={updateAmount}
              url={URL}
              empty={empty}
              />} />
          
          {/* <Route path="/discount" element={<Discount url={URL} addToCart={addToCart}/>}></Route> */}
          <Route path="/product/:id" element={<Product url={URL} addToCart={addToCart} />}></Route>
          <Route path="/product/carousel/:id" element={<Product url={URL} addToCart={addToCart} />}></Route>
        </Routes>
      </div> 
        <Footer /> </>}
    </div> 
    
  );
}

