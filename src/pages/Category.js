import { useState, useEffect } from "react"
import axios from 'axios';
import Products from "./Products";

export default function Category({url, id, addToCart}) {

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shopList, setShopList] = useState(null);
  const [products, setProducts] = useState([]);  

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("id", id);
    axios.post(`${url}/category.php`, params)
      .then((response) => {
        setProducts(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
  }, [id]);

  return (
    <div>
      {products?.map(item => (
        <div key={item.tuote_id}>
          <h3>
           {item.tuotenimi}
          </h3>
          <p>{item.kuvaus}</p>
          <button className='btn btn-primary' type="button" onClick={(e) => addToCart(item)}>Add</button>
        </div>
      ))}
    </div>
  )
}