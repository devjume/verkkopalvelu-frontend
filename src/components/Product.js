import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";



export default function Product({url}) {

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
      <div className='row mt-4 px-4'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* Palaa takaisin edelliselle sivulle käyttämällä react-router-dom useNavigate API:ta */}
            <li className="breadcrumb-item"><button type="button" className="btn btn-info" onClick={() => navigate(-1)}>Takaisin tuotteisiin</button></li>
          </ol>
        </nav>
        <div className='col-4 mt-3'>
          <img src={product.kuvatiedosto} className="" alt={product.tuotenimi} style={{ width: "auto", height: "350px", objectFit: "scale-down" }}></img>
        </div>
        <div className='col-4 offset-2 mt-3'>
          <h4>{product.tuotenimi}</h4>
          <h6>Valmistaja: {product.valmistaja}</h6>
          <h3>{discountPrice === null ? product.hinta : discountPrice}€ {discountPrice !== null && <span className="linethrough fw-normal">{product.hinta}€</span>}</h3>
        </div>
      </div>
      <div className='row mt-4 px-4'>
        <div className='col-6 mt-3'>
          <h4>Kuvaus:</h4>
          <p>{product.kuvaus}</p>
        </div>
      </div>
    </>
    
  );
}