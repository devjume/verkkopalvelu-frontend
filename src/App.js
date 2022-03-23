import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from './pages/Products';

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";



export default function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/products" element={<Products />} ></Route>
        </Routes>
        <Header></Header>
        <Footer />
      </div>
    </>

  );
}