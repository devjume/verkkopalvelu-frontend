import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function Product({url}) {

  const [product, setProduct] = useState(undefined)
  const {id} = useParams();


  useEffect(() => {
      axios.get(`${url}/product.php`, { params: {id: id}})
        .then((response) => {
          setProduct(response.data);
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
        <h3>{product.tuotenimi}</h3>
        <div className='col-4 mt-3'>
          <img src={product.kuvatiedosto} className="" alt={product.tuotenimi} style={{ width: "auto", height: "350px", objectFit: "scale-down" }}></img>
        </div>
        <div className='col-4 offset-2 mt-3'>
          <h4>{product.tuotenimi}</h4>
          <h6>Valmistaja: {product.valmistaja}</h6>
          <h3>{product.hinta} €</h3>
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