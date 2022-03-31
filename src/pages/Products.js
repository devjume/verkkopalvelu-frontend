import { useState, useEffect } from "react"
import Category from "./Category";

export default function Products({url, addToCart}) {

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shopList, setShopList] = useState(null);
  const [products, setProducts] = useState([]);  
  const [categoryName, setCategoryName] = useState ('');

  async function fetchProducts() {
    try {
      const response = await fetch(`${url}/products.php`)
      const data = await response.json();

      if (!response.ok) throw Error(data.error);

      setProducts(data);
      setFetchError(null);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products:</h1>
      <ul>
          {/* Jos tietoja ei ole vielä ladattu, näytä käyttäjälle viesti */}
          {!isLoaded && <li>"Tietoja ladataan..."</li>}
          
          {/* Jos virheitä, näytä ne käyttäjälle */}
          {fetchError && <li>{fetchError}</li>}

          {/* Kun tieto on ladattu eikä virheitä ole niin näytä haluttu elementti */}
          {isLoaded && !fetchError && (products.map((product) => <li key={product.tuote_id}>{product.tuotenimi}</li>))}
          
      
        
      </ul>
    </div>
  )
}