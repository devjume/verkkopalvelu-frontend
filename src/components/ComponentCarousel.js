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

export default function ComponentCarousel({ categoryId, url, categoryName }) {
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
              <div>
                <img className="carousel_img" src={product.kuvatiedosto}/>
              </div>
              <div>
                <Link to={`/product/carousel/${product.tuote_id}`}>
                  {product.tuotenimi}
                </Link> 
                {" "+ product.hinta}
              </div>
            </Item>
          ))} 
        </Carousel>
      </div>
    </>
  );
}
