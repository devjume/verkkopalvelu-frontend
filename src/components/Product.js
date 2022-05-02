import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";



export default function Product({url, addToCart}) {

  const [product, setProduct] = useState(undefined)
  const [discountPrice, setDiscountPrice] = useState(null);

  const {id} = useParams();

  let navigate = useNavigate();


  useEffect(() => {
      axios.get(`${url}/product.php`, { params: {id: id}})
        .then((response) => {
          setProduct(response.data);

          // Tarkastaa onko alehintaa määritelty. Jos alehintaa ei ole tai se on 0 niin laitetaan discountPrice arvoksi = null. Tämä arvo nyt yksinkertaisempi tarkistaa alhaalla return kohdassa.
          if (isNaN(parseFloat(response.data.alehinta)) || parseFloat(response.data.alehinta) <= 0) {
            setDiscountPrice(null);
          } else {
            setDiscountPrice(parseFloat(response.data.alehinta));
          }
        }).catch(error => {
          alert(error.response ? error.response.data.error : error)
        })


  }, [])


  if (product === undefined) {
    return <h1>Lataa...</h1>
  }

  return (
    <>
    <main className='p-3 m-3'>
      <div className='row mt-4 px-4'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* Palaa takaisin edelliselle sivulle käyttämällä react-router-dom useNavigate API:ta */}
            <li className="breadcrumb-item"><button type="button" className="btn btn-outline-dark" onClick={() => navigate("/products")}>Takaisin tuotteisiin</button></li>
          </ol>
        </nav>
        <div className='col-lg-5 mt-3'>
          <h2 className='p-2'>{product.tuotenimi}</h2>
          <img src={product.kuvatiedosto} className="img-fluid text-center" alt={product.tuotenimi} style={{ width: "auto", height: "350px", objectFit: "scale-down" }}></img>
        </div>
        <div className='col-lg-4 offset-lg-2 mt-3 p-4 kuvaustiedot text-white'>
          <h2>{product.tuotenimi}</h2>
          <h6>Valmistaja: {product.valmistaja}</h6>
          <h3>{discountPrice === null ? product.hinta : discountPrice}€ {discountPrice !== null && <s className="fs-5 fw-normal">{product.hinta}€</s>}</h3>
          <button className='btn btn-outline-dark' onClick={(e) => addToCart(product)} style={{ zIndex: 1 }}>Lisää ostoskoriin <i className='bi bi-cart-fill'></i></button>
          </div>
      </div>
      <div className='row mt-4 px-4 kuvaus'>
        <div className='col-lg-10 mt-3'>
          <h4>Kuvaus:</h4>
          <p>{product.kuvaus}</p>
        </div>
      </div>
      </main>
    </>
    
  );
}