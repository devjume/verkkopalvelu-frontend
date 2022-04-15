import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function ProductCard({product, addToCart}) {

  useEffect(() => {
  }, []);

  return (
    <div className="col-md-4 col-lg-3 d-flex" key={product.tuote_id}>
      <div className="card p-2 w-100">
        <img src={product.kuvatiedosto} className="card-img-top img-fluid" alt={product.tuotenimi} style={{ width: "auto", height: "200px", objectFit: "scale-down" }}></img>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{product.tuotenimi}</h6>
          <p className="card-text text-truncate flex-fill">{product.kuvaus}</p>
          <div className="d-flex justify-content-between">
            <h5><Link to={`/product/${product.tuote_id}`} className="stretched-link" style={{ textDecoration: "none", color: "inherit" }}>{product.hinta}</Link></h5>
            <button type="button" className="btn btn-success" onClick={(e) => addToCart(product)} style={{ zIndex: 1 }}><i className="bi bi-cart-fill"></i></button>
          </div>
        </div>
      </div >
    </div>
  )
}