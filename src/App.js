import './App.css';
import { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from './pages/Products';
import Category from './pages/Category';

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";


const URL = "http://localhost/verkkopalvelu-backend";

export default function App() {
    
  
    const [cart, setCart] = useState([]);
  
   useEffect(() => {
     if ('cart' in localStorage) {
       setCart(JSON.parse(localStorage.getItem('cart')));
     }
   }, [])
  
    function addToCart(product) {
      const newCart = [...cart,product]; 
      setCart(newCart);
      localStorage.setItem('cart',JSON.stringify(newCart));
    }


  return (
    <>
      <div className="container">
        <Navbar url={URL} cart={cart}/>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/products/:categoryId" element={<Products url={URL} addToCart={addToCart}/>} />
          <Route path="/products" element={<Products url={URL}/>}></Route>
          {/* TÄMÄ DYNAAMISEKSI */}
          <Route path="/Kannettavat" element={<Category url={URL} id={1}/>}></Route>
          <Route path="/Komponentit" element={<Category url={URL} id={2}/>}></Route>
        </Routes>
        <Header></Header>
        <Footer />
      </div>
    </>

  );
}

