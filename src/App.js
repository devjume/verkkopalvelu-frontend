import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from './pages/Products';
import Category from './pages/Category';

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const URL = "http://localhost/verkkopalvelu-backend";

export default function App() {
  return (
    <>
      <div className="container">
        <Navbar url={URL}/>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
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