import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function CarDetails({url, addToCart}) {

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
    <div id='detailsDiv'>
        <h2>{product.tuotenimi}</h2>
        <h3>Hinta: {product.hinta}€</h3>
        <p>Speksit: {product.kuvaus}</p>
        <p>Valmistaja: {product.valmistaja}</p>
        <img src={product.kuvatiedosto}/>
        <button className='btn' type="button" onClick={(e) => addToCart(product)}>Add</button>
        <Link to={`/`}>
            <p>lähe pois!!</p>
        </Link>
    </div>
  );
}