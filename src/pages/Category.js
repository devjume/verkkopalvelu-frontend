import { useState, useEffect } from "react"
import axios from 'axios';

export default function Category({url, id}) {

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
        </div>
      ))}
    </div>
  )
}