import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function ProductCard({product, addToCart}) {

  const [discountPrice, setDiscountPrice] = useState(parseFloat(product.alehinta));

  useEffect(() => {
    if (isNaN(parseFloat(product.alehinta)) || parseFloat(product.alehinta) <= 0) {
      setDiscountPrice(null);
    }
  }, []);

  return (
      <div className="card w-100 korttibg">
        <img src={product.kuvatiedosto} className="card-img-top img-fluid my-2 bg-white" alt={product.tuotenimi} style={{ width: "auto", height: "200px", objectFit: "scale-down" }}></img>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{product.tuotenimi}</h6>
          <p className="card-text text-truncate flex-fill">{product.kuvaus}</p>
          <div className="d-flex justify-content-between">
            <h5><Link to={`/product/${product.tuote_id}`} className="stretched-link" style={{ textDecoration: "none", color: "inherit" }}>{discountPrice === null ? product.hinta : discountPrice}€</Link> {discountPrice !== null && <s className="fs-6 fw-normal">{product.hinta}€</s>} </h5>
            <button type="button" className="btn btn-outline-dark" onClick={(e) => addToCart(product)} style={{ zIndex: 1 }}><i className="bi bi-cart-fill"></i></button>
          </div>
        </div>
    </div>
  )
}