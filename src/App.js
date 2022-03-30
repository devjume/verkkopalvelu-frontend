import './App.css';
import { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import axios from 'axios';
import Home from "./pages/Home";
import Products from './pages/Products';
import Category from './pages/Category';
import Admin from './pages/Admin';

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const URL = "http://localhost/verkkopalvelu-backend";

export default function App() {
  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${URL}/categories.php`)
      .then((response) => {
        setCategories(response.data);
        setIsLoaded(true);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      })
  }, [])

  return (
    <>
    { isLoaded && 
      <div className="container">
        <Navbar url={URL} categories={categories}/>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/products" element={<Products url={URL}/>}></Route>
          {categories?.map(category => (
            <Route path={category.nimi} key={category.id} element={<Category url={URL} id={category.id}/>}></Route>
          ))}


          <Route path="/admin" element={<Admin url={URL} />}></Route>
           </Routes>
        <Header></Header>
        <Footer />
      </div> }
    </>

  );
}