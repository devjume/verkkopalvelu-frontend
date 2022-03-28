import './App.css';
import { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import axios from 'axios';
import Home from "./pages/Home";
import Products from './pages/Products';
import Category from './pages/Category';

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
      <div className="container">
        <Navbar url={URL}/>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/products" element={<Products url={URL}/>}></Route>
          {/* TÄMÄ DYNAAMISEKSI */}
          {isLoaded && <Route path="/Kannettavat" element={<Category url={URL} id={categories[0]['id']}/>}></Route> }
          <Route path="/Komponentit" element={<Category url={URL} id={2}/>}></Route>
        </Routes>
        <Header></Header>
        <Footer />
      </div>
    </>

  );
}