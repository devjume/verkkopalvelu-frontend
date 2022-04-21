import React from "react";
import Carousel from "react-elastic-carousel";
import ProductCard from "./ProductCard";
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
        <Carousel breakPoints={breakPoints} itemPadding={[0, 5]}  /*autoPlaySpeed={10000} enableAutoPlay={true}*/ enableMouseSwipe={false} enableSwipe={false} showArrows={true}>
        {products?.map(product => (
          <div className="col-12 d-flex" key={product.tuote_id}>
            <ProductCard product={product} addToCart={addToCart} key={product.tuote_id} />
          </div>
        ))} 
            {/* <Item key={product.tuote_id} >
              <div className="card p-2" style={{width: "300px", height: "22vw"}}>
              <div className="embed-responsive embed-responsive-16by9">
                <img src={product.kuvatiedosto} draggable="false" className="card-img-tops embed-responsive-item" alt={product.tuotenimi}></img>
              </div>

              <Link to={`/product/${product.tuote_id}`} draggable="false" style={{ textDecoration: "none", color: "inherit"}}>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate" >{product.tuotenimi}</h6>
                <p className="card-text text-truncate flex-fill">{product.kuvaus}</p>
                <div className="d-flex justify-content-between">
                  <h5>{product.hinta}</h5>
                </div>
              </div>
              </Link>
              <button className='btn btn-primary' type="button" onClick={(e) => addToCart(product)}>Add</button>
            </div >
        </Item> */}
        
        </Carousel>
      </div>
    </>
  );
}


            
         