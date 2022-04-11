import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { useState, useEffect } from "react"
import axios from 'axios';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function ComponentCarousel({ categoryId, url, categoryName, addToCart }) {
  const [products, setProducts] = useState([]);  

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("id", categoryId);
    axios.post(`${url}/carouselendpoint.php`, params)
      .then((response) => {
        setProducts(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{categoryName}</h1>
      <div className="carousel">
        <Carousel breakPoints={breakPoints}>
        {products?.map(product => (
            <Item key={product.tuote_id} >
              <div className="card p-2" style={{width: "300px", height: "350px"}}>
              <img src={product.kuvatiedosto} className="card-img-top img-fluid" alt={product.tuotenimi} style={{width: "300px", height: "200px"}}></img>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.tuotenimi}</h6>
                <p className="card-text text-truncate flex-fill">{product.kuvaus}</p>
                <div className="d-flex justify-content-between">
                  <h5><Link to={`/product/carousel/${product.tuote_id}`} className="stretched-link" style={{ textDecoration: "none", color: "inherit"}}>{product.hinta}</Link></h5>
                </div>
              </div>
            </div >
            <button className='btn btn-primary' type="button" onClick={(e) => addToCart(product)}>Add</button>
            </Item>
          ))} 
        </Carousel>
      </div>
    </>
  );
}

            
         