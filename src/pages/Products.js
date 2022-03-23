import { useState, useEffect } from "react"

export default function Products({url}) {

  const [fetchError, setFetchError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shopList, setShopList] = useState(null);
  const [products, setProducts] = useState(null);  

  async function fetchProducts() {
    try {
      const response = await fetch(`${url}/products.php`)
      const data = await response.json();

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
          {!isLoaded && "Tietoja ladataan..."}
          
          {/* Jos virheitä, näytä ne käyttäjälle */}
          {fetchError && {fetchError}}

          {/* Kun tieto on ladattu eikä virheitä ole niin näytä haluttu elementti */}
          {!fetchError && isLoaded && products.map((product) => <li key={product.tuote_id}>{product.tuotenimi}</li>)}
          
      </ul>
    </div>
  )
}